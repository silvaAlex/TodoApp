import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import RepoService from './repo.service';
import User from '../db/models/user.entity';
import Task from '../db/models/task.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User, Task])],
  providers: [RepoService],
  exports: [RepoService],
})
export default class RepoModule {}
