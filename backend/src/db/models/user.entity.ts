import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
} from 'typeorm';
import Task from './task.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity({ name: 'users' })
export default class User {
  @Field()
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @Column()
  email?: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  // Associations
  // Associations
  @OneToMany(
    () => Task,
    task => task.userConnection,
  )
  taskConnection!: Promise<Task[]>;
}
