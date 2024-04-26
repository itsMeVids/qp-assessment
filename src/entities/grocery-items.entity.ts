
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { OrderEntity } from './order.entity';
import { OrderItemsEntity } from './order-items.entity';
import { UserEntity } from './user.entity';

@Entity()
export class GroceryItemsEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column()
    quantityAvailable: number;

    @Column()
    createdById: number;
  
    @Column({ nullable: true })
    updatedById: number;
  
    @ManyToOne(() => UserEntity, {
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      eager: true,
    })
    @JoinColumn({ name: 'createdById' })
    createUser: UserEntity;
  
    @ManyToOne(() => UserEntity, {
      cascade: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      eager: true,
    })
    @JoinColumn({ name: 'updatedById' })
    updateUser: UserEntity;

    @CreateDateColumn()
    createdAt?: Date;

    @CreateDateColumn()
    updatedAt?: Date;
}
