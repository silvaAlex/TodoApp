import Task from 'src/db/models/task.entity';
import User from 'src/db/models/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import RepoModule from './repos/repo.module';
import UserResolver from './resolvers/user.resolver';
import TaskResolver from './resolvers/task.resolver';
import { GraphQLModule } from '@nestjs/graphql';

const gqlImports = [UserResolver, TaskResolver];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data/todo.db',
      synchronize: true,
      entities: [User, Task],
    }),
    RepoModule,
    ...gqlImports,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
