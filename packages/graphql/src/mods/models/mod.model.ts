import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Mod {
  @Field()
  readonly name: string;

  @Field()
  readonly path: string;

  @Field(() => [String])
  readonly tags: string[];

  @Field()
  readonly picture: string;

  @Field()
  readonly version: string;

  @Field()
  readonly supportedVersion: string;

  @Field(() => Int)
  readonly remoteFileId: number;
}
