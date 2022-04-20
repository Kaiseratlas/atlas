import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class PageInfo {
  constructor(o: PageInfo) {
    this.startCursor = o.startCursor;
    this.endCursor = o.endCursor;
    this.hasPreviousPage = o.hasPreviousPage;
    this.hasNextPage = o.hasNextPage;
  }

  @Field({ nullable: true })
  readonly startCursor: string;
  @Field({ nullable: true })
  readonly endCursor: string;
  @Field()
  readonly hasPreviousPage: boolean;
  @Field()
  readonly hasNextPage: boolean;
}
