import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { GroceryItemsEntity } from "./grocery-items.entity";
import { OrderItemsEntity } from "./order-items.entity";

@Entity()

export class OrderEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    totalPrice: number;

    @Column({ nullable: true })
    createdById: number;

    @ManyToOne(() => UserEntity, user => user.orders)
    @JoinColumn({ name: 'createdById', referencedColumnName: 'id' })
    user: UserEntity;

    @OneToMany(
        () => OrderItemsEntity,
        (orderItem) => orderItem.order,
        {
            cascade: true,
            onDelete: 'CASCADE',
            eager: false,
            onUpdate: 'CASCADE',
        },
    )
    selectedItems: OrderItemsEntity[];

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
