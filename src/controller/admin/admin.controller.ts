import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { GroceryItemsDto } from 'src/dto/grocery-items.dto';
import { UserRoleType } from 'src/enums/user.enum';
import { AdminService } from 'src/services/admin/admin.service';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  //** this api for create grocery items in inventory */
  @Post('grocery-items')
  async createGroceryItem(
    @Body() groceryItemsDto: GroceryItemsDto,
    @Query('userRight') userRight: UserRoleType,
  ) {
    return await this.adminService.createGroItem(groceryItemsDto, userRight);
  }

  //** this api for get all the list of grocery items  available in inventory */
  @Get('get-grocery-items-list')
  async getGroceryItem() {
    return await this.adminService.getGroItems();
  }

  //** this api for deleting grocery items based on groceryId from inventory */
  @Delete('/:id')
  async deleteItemById(
    @Param() param: { id: number },
    @Query('userRight') userRight: UserRoleType,
  ) {
    return await this.adminService.deleteGroItem(param.id, userRight);
  }

  //** this api for updating grocery items based on itemId from inventory */
  @Patch('grocery-item/:itemId')
  async updateGroItem(
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() groceryItemsDto: GroceryItemsDto,
    @Query('userRight') userRight: UserRoleType,
  ) {
    return await this.adminService.updateItem(
      itemId,
      groceryItemsDto,
      userRight,
    );
  }

  //** this api for updating the inventory availablity of grocery items based on itemId */
  @Patch('grocery-items/inventory/:itemId')
  async updateInventory(
    @Param('itemId', ParseIntPipe) itemId: number,
    @Query('newQuantity') newQuantity: number,
    @Query('userRight') userRight: UserRoleType,
  ) {
    return await this.adminService.manageInventory(
      itemId,
      newQuantity,
      userRight,
    );
  }
}
