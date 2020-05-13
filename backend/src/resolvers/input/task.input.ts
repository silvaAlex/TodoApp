import { Field, InputType } from '@nestjs/graphql';
import UserInput from './user.input';

/*@InputType()
class TaskUserConnectInput {
  @Field()
  readonly id?: number;
}

@InputType()
class TaskUserInput {
  @Field({ nullable: true })
  readonly connect?: TaskUserConnectInput;

  @Field({ nullable: true })
  readonly create?: UserInput;
}*/

@InputType()
export class DeleteTaskInput {
  @Field()
  readonly id?: number;

  @Field()
  readonly userId?: number;
}

@InputType()
export default class TaskInput {
  @Field()
  readonly description?: string;

  @Field()
  readonly completed?: boolean;

  @Field()
  readonly userId?: number;
}
