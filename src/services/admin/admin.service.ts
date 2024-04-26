import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroceryItemsDto } from 'src/dto/grocery-items.dto';
import { GroceryItemsEntity } from 'src/entities/grocery-items.entity';
import { UserRoleType } from 'src/enums/user.enum';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(GroceryItemsEntity)
    private groceryItemsRepo: Repository<GroceryItemsEntity>,
  ) {}

  //** method for craeting Grocery item */
  async createGroItem(
    groceryItemsDto: GroceryItemsDto,
    userRight: UserRoleType,
  ) {
    if (userRight == UserRoleType.ADMIN) {
      let createdData = await this.groceryItemsRepo.create(groceryItemsDto);
      return await this.groceryItemsRepo.save(createdData);
    } else {
      throw new UnprocessableEntityException(
        `You Don't have access to create Grocery Item`,
      );
    }
  }

  //** method to get  Grocery items */
  async getGroItems() {
    return await this.groceryItemsRepo
      .createQueryBuilder('items')
      .getManyAndCount();
  }

  //** method to delete  Grocery items by id */
  async deleteGroItem(id: number, userRight: UserRoleType) {
    if (userRight == UserRoleType.ADMIN) {
      const deletedItem = await this.groceryItemsRepo.delete(id);
      return { message: 'Item deleted successfully....' };
    } else {
      throw new UnprocessableEntityException(
        `You Don't have access to delete Grocery Item`,
      );
    }
  }

  //** helper method to update Grocery items by id */
  async updateGroItem(
    groceryItemsDto: GroceryItemsDto,
    userRight: UserRoleType,
  ) {
    if (userRight == UserRoleType.ADMIN) {
      return await this.createGroItem(groceryItemsDto, userRight);
    } else {
      throw new UnprocessableEntityException(
        `You Don't have access to update Grocery Item`,
      );
    }
  }

  //** main method to update Grocery items by id */
  async updateItem(
    itemId: any,
    groceryItemsDto: GroceryItemsDto,
    userRight: UserRoleType,
  ) {
    if (userRight == UserRoleType.ADMIN) {
      let item = await this.groceryItemsRepo.findOne({ where: { id: itemId } });
      console.log('item', item);

      if (item) {
        if (item.name !== groceryItemsDto.name) {
          let isItemExists = await this.groceryItemsRepo.findOne({
            where: { name: groceryItemsDto.name },
          });
          if (isItemExists) {
            throw new BadRequestException('Item is already exists');
          }
        }
      } else {
        throw new NotFoundException('Item not found');
      }
      groceryItemsDto.id = itemId;
      groceryItemsDto.updatedById = item.createdById;

      let updatedItem = await this.updateGroItem(groceryItemsDto, userRight);
      return { message: 'Item Updated successfully...', updatedItem };
    } else {
      throw new UnprocessableEntityException(
        `You Don't have access to update Grocery Item`,
      );
    }
  }

  //** method for manageInventory  items by id */
  async manageInventory(itemId, newQuantity, userRight) {
    if (userRight == UserRoleType.ADMIN) {
      const item = await this.groceryItemsRepo.findOne({
        where: { id: itemId },
      });
      if (!item) {
        throw new Error('Item not found');
      }
      item.quantityAvailable = newQuantity;
      const updatedInventory = await this.groceryItemsRepo.save(item);
      return { message: 'Inventory level updated successfully' };
    } else {
      throw new UnprocessableEntityException(
        `You Don't have access to update Inventory level`,
      );
    }
  }
}
