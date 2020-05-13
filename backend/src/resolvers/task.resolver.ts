import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import RepoService from '../repos/repo.service';
import Task from '../db/models/task.entity';
import TaskInput, { DeleteTaskInput } from './input/task.input';
import User from 'src/db/models/user.entity';

@Resolver(() => Task)
export default class TaskResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [Task])
  public async getTasks(): Promise<Task[]> {
    return this.repoService.taskRepo.find();
  }

  @Query(() => [Task])
  public async getTaskFromUser(
    @Args('userId') userId: number,
  ): Promise<Task[]> {
    return this.repoService.taskRepo.find({
      where: { userId },
    });
  }

  @Query(() => Task, { nullable: true })
  public async getTask(@Args('userId') userId: number): Promise<Task> {
    return this.repoService.taskRepo.findOneOrFail(userId);
  }

  @Mutation(() => Task)
  public async createTask(@Args('data') input: TaskInput): Promise<Task> {
    const task = this.repoService.taskRepo.create({
      description: input.description,
      completed: input.completed,
      userId: input.userId,
    });

    return this.repoService.taskRepo.save(task);
  }

  @Mutation(() => Task)
  public async deleteTask(@Args('data') input: DeleteTaskInput): Promise<Task> {
    const task = await this.repoService.taskRepo.findOne(input.id);

    if (!task || task.userId != input.userId)
      throw new Error('Task does not exists or you are not the task author');

    const copy = { ...task };

    await this.repoService.taskRepo.remove(task);

    return copy;
  }

  @ResolveField(() => User, { name: 'user' })
  public async getUser(@Parent() parent: Task): Promise<User> {
    return this.repoService.userRepo.findOneOrFail(parent.userId);
  }
}
