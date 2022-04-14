import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Character } from './models/character.model';
import { InjectParser } from '../parser/parser.module';
import Parser from '@kaiseratlas/parser';
import { CharacterRole } from './unions/character-role.union';
import { CharacterPortraits } from './models/character-portraits.model';

@Resolver(() => Character)
export class CharactersResolver {
  constructor(@InjectParser() protected parser: Parser) {}

  @Query(() => [Character], { name: 'characters' })
  getCharacters() {
    return this.parser.common.characters.load();
  }

  @ResolveField(() => String, { name: 'name' })
  async getName(@Parent() character: Character) {
    // @ts-ignore
    const localisation = await character.getName();
    if (!localisation) {
      return character['name'];
    }
    return localisation.value;
  }

  @ResolveField(() => [CharacterRole], { name: 'roles' })
  getRoles(@Parent() character: Character) {
    return [];
  }

  @ResolveField(() => CharacterPortraits, { name: 'portraits' })
  getPortraits(@Parent() character: Character) {
    // @ts-ignore
    return character.portraits;
  }
}
