import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/db/models/user.entity';
import Task from 'src/db/models/task.entity';

@Injectable()
export default class RepoService {
  public constructor(
    @InjectRepository(User) public readonly userRepo: Repository<User>,
    @InjectRepository(Task) public readonly taskRepo: Repository<Task>,
  ) {}
}
