import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from './user.entity';

@ObjectType()
@Entity({ name: 'tasks' })
export default class Task {
  @Field()
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @Column()
  description?: string;

  @Field()
  @Column()
  completed?: boolean;

  @Field()
  @Column({ name: 'user_id' })
  userId?: number;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @Field(() => User)
  user?: User;

  // Associations

  // Associations
  @ManyToOne(
    () => User,
    user => user.taskConnection,
    { primary: true },
  )
  @JoinColumn({ name: 'user_id' })
  userConnection!: Promise<User>;
}
