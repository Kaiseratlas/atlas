import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CharacterPortrait } from './character-portrait.model';

@ObjectType()
export class CharacterPortraits {
  @Field(() => CharacterPortrait)
  readonly civilian: CharacterPortrait;
  @Field(() => CharacterPortrait)
  readonly army: CharacterPortrait;
  @Field(() => CharacterPortrait)
  readonly navy: CharacterPortrait;
}
