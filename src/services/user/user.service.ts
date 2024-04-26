import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';
import { GroceryItemsDto } from 'src/dto/grocery-items.dto';
import { OrderItemDTO } from 'src/dto/order-items.dto';
import { CreateOrderDto } from 'src/dto/order.dto';
import { CreateUserDto } from 'src/dto/user.dto';
import { GroceryItemsEntity } from 'src/entities/grocery-items.entity';
import { OrderItemsEntity } from 'src/entities/order-items.entity';
import { OrderEntity } from 'src/entities/order.entity';
import { UserEntity } from 'src/entities/user.entity';
import { UserRoleType } from 'src/enums/user.enum';
import { Repository } from 'typeorm';

export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,

    @InjectRepository(GroceryItemsEntity)
    private groceryItemsRepo: Repository<GroceryItemsEntity>,

    @InjectRepository(OrderEntity)
    private orderRepo: Repository<OrderEntity>,
  ) {}

  //** method for creating user */
  createUser(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    return this.userRepository.save(newUser);
  }

  //** method for getting all user list */
  async findAllUser() {
    return await this.userRepository.find();
  }

  //** method for finding  user by userId */
  async findUserById(id: number) {
    const query = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :userId', { userId: id })
      .getOne();
    return query;
  }

  //** method for generating  user token by emailId */
  async findByMailToken(emailId): Promise<any> {
    const user = await this.userRepository.findOneBy(emailId);
    console.log('user', user);

    const payload = { username: user.userName, userId: user.id };
    let access_token = this.jwtService.sign(payload);
    console.log(' access_token', access_token);

    return {
      access_token,
    };
  }

  //** method for getting order list */
  getOrderList() {
    const orderList = this.orderRepo
      .createQueryBuilder('orderList')
      .leftJoinAndSelect('orderList.selectedItems', 'selectedItems')
      .leftJoinAndSelect('selectedItems.groceryItem', 'groceryItem')
      .getMany();
    return orderList;
  }

  //** method for creating order */
  async createOrder(createOrderDto: CreateOrderDto) {
    // Checking if items are available before creating the order
    const itemsAvailable = await this.checkAvailability(
      createOrderDto.selectedItems,
    );
    if (!itemsAvailable) {
      throw new Error('Some items are not available in sufficient quantity');
    }

    // Creating the order
    const newOrder = this.orderRepo.create(createOrderDto);
    const savedOrder = await this.orderRepo.save(newOrder);

    // Updating the inventory after ordering
    await this.updateInventory(createOrderDto.selectedItems);

    return savedOrder;
  }

  //** method for checking availablity of item into the inventory */
  async checkAvailability(items: OrderItemDTO[]) {
    for (const item of items) {
      const groceryItemId = item.groceryItemId;
      const groceryItem = await this.groceryItemsRepo
        .createQueryBuilder('groceryItems')
        .where('groceryItems.id = :id', { id: groceryItemId })
        .getOne();

      if (!groceryItem || groceryItem.quantityAvailable < item.quantity) {
        return false;
      }
    }
    return true;
  }

  //** method for updating the inventory */
  async updateInventory(items: OrderItemDTO[]) {
    for (const item of items) {
      const groceryItemId = item.groceryItemId;

      const groceryItem = await this.groceryItemsRepo
        .createQueryBuilder('groceryItems')
        .where('groceryItems.id = :id', { id: groceryItemId })
        .getOne();

      console.log('groceryItem', groceryItem);
      if (groceryItem) {
        groceryItem.quantityAvailable -= item.quantity;
        await this.groceryItemsRepo.save(groceryItem);
      } else {
        return 'Items are not available';
      }
    }
  }
}
