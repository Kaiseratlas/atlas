import { Field, ID, ObjectType } from '@nestjs/graphql';
import * as Parser from '@kaiseratlas/parser';
import { CharacterRoleUnion } from '../unions/character-role.union';

@ObjectType()
export class Character extends Parser.Character {
  @Field(() => ID)
  readonly id: string;
}
