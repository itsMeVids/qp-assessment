import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { UserRoleType } from 'src/enums/user.enum';
import { OrderEntity } from './order.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  userName: string;

  @Column()
  emailId: string;

  @Column({ nullable: true })
  address: string;

  @Column()
  password: string;

  @Column({ default: UserRoleType.USER, nullable: true })
  userRoleType: UserRoleType;

  @OneToMany(
    () => OrderEntity,
    (order) => order.user,
    {
      cascade: true,
      onDelete: 'CASCADE',
      eager: false,
      onUpdate: 'CASCADE',
    },
  )
  orders: OrderEntity[];

  @CreateDateColumn({ nullable: true })
  createdAt?: Date;

  @CreateDateColumn({ nullable: true })
  updatedAt?: Date;
}

