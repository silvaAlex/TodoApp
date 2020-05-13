import { Injectable } from '@nestjs/common';
import RepoService from './repos/repo.service';

@Injectable()
export class AppService {
  constructor(private readonly repoService: RepoService) {}
  async getHello(): Promise<string> {
    return `Total tasks are ${await this.repoService.taskRepo.count()} exiting tasks`;
  }
}
