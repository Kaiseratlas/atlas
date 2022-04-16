import { Field, ObjectType } from '@nestjs/graphql';
import { CharacterPortrait } from './character-portrait.model';

@ObjectType()
export class CharacterPortraits {
  @Field(() => CharacterPortrait, { nullable: true })
  readonly civilian: CharacterPortrait;
  @Field(() => CharacterPortrait, { nullable: true })
  readonly army: CharacterPortrait;
  @Field(() => CharacterPortrait, { nullable: true })
  readonly navy: CharacterPortrait;
}
