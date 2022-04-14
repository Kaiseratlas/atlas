import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CharacterPortrait {
  @Field({ nullable: true })
  large: string;
  @Field({ nullable: true })
  small: string;
}
