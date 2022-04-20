import { ArgsType, Int, Field } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { nullable: true })
  readonly first: number = 10;

  @Field(() => String, { nullable: true })
  readonly after: string;

  @Field(() => Int, { nullable: true })
  readonly last: number = 10;

  @Field(() => String, { nullable: true })
  readonly before: string;
}
