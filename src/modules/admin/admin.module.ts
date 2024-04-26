import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from 'src/controller/admin/admin.controller';
import { GroceryItemsEntity } from 'src/entities/grocery-items.entity';
import { UserEntity } from 'src/entities/user.entity';
import { AdminService } from 'src/services/admin/admin.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity,GroceryItemsEntity]), 
  ],
  controllers: [AdminController], 
  providers: [AdminService], 
})

export class AdminModule {}
