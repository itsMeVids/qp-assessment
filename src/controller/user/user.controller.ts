import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Query,
} from '@nestjs/common';
import { CreateOrderDto } from 'src/dto/order.dto';
import { CreateUserDto } from 'src/dto/user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { AdminService } from 'src/services/admin/admin.service';
import { UserService } from 'src/services/user/user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly adminService: AdminService,
  ) {}

  //** this api for adding new user into the system */
  @Post('/addUser')
  async createUser(@Body() createuserdto: CreateUserDto): Promise<UserEntity> {
    return await this.userService.createUser(createuserdto);
  }

  //** this api for getting all user list from the system */
  @Get('/allUsers')
  async getAll(): Promise<UserEntity[]> {
    const allUsers = await this.userService.findAllUser();
    console.log(allUsers);
    return allUsers;
  }

  //** this api for updating  user by userId  into the system */
  @Get('/userById')
  async findUserById(@Query('id') id: number) {
    const user = await this.userService.findUserById(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    } else {
      return user;
    }
  }

  //** this api for getting all the grocery items list into the inventory */
  @Get('grocery-items-list')
  async getGroceryItem() {
    return await this.adminService.getGroItems();
  }

  //** this api for creating order */
  @Post('/order')
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return await this.userService.createOrder(createOrderDto);
  }

  //** this api for getting all the order list */
  @Get('order-items-list')
  async getOrderItemList() {
    return await this.userService.getOrderList();
  }
}
