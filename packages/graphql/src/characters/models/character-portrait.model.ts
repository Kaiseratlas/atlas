import { Field, ObjectType } from '@nestjs/graphql';
import * as Parser from '@kaiseratlas/parser';

@ObjectType()
export class CharacterPortrait extends Parser.CharacterPortrait {
  @Field({ nullable: true, name: 'large' })
  readonly largeUrl: string;
  @Field({ nullable: true, name: 'small' })
  readonly smallUrl: string;
}
