import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controller/user/user.controller';
import { GroceryItemsEntity } from 'src/entities/grocery-items.entity';
import { OrderItemsEntity } from 'src/entities/order-items.entity';
import { OrderEntity } from 'src/entities/order.entity';
import { UserEntity } from 'src/entities/user.entity';
import { AdminService } from 'src/services/admin/admin.service';
import { UserService } from 'src/services/user/user.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity,GroceryItemsEntity,OrderItemsEntity,OrderEntity]), 
  ],
  controllers: [UserController], 
  providers: [UserService,JwtService,AdminService], 
})

export class UserModule {}
