import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from "./order.entity";
import { GroceryItemsEntity } from "./grocery-items.entity";

@Entity()
export class OrderItemsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  orderId: number;

  @ManyToOne(
    () => OrderEntity,
    (order) => order.selectedItems,
    {
      eager: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      orphanedRowAction: 'delete',
    },
  )
  order: OrderEntity;

  @Column({ nullable: true })
  groceryItemId: number;
  @ManyToOne(() => GroceryItemsEntity, (GroceryItem) => GroceryItem.id, {
    eager: true,
    cascade: false,
  })
 @JoinColumn({ name: 'groceryItemId' })
  groceryItem: GroceryItemsEntity;

  @Column({ nullable: true })
  quantity: number;
}