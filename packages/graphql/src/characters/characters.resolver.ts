import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Character } from './models/character.model';
import { InjectParser } from '../parser/parser.module';
import Parser from '@kaiseratlas/parser';
import { CharacterRole } from './unions/character-role.union';
import { CharacterPortraits } from './models/character-portraits.model';
import { ProductEntitiesResolver } from '../shared/resolvers';

@Resolver(() => Character)
export class CharactersResolver extends ProductEntitiesResolver(Character, {
  plural: 'characters',
}) {
  constructor(@InjectParser() protected parser: Parser) {
    super(parser.common.characters);
  }

  @ResolveField(() => String, { name: 'name' })
  async getName(@Parent() character: Character) {
    const localisation = await character.getName();
    if (!localisation) {
      return character['name'];
    }
    return localisation.value;
  }

  @ResolveField(() => [CharacterRole], { name: 'roles' })
  getRoles(@Parent() character: Character) {
    return [];
    return character.roles;
  }

  @ResolveField(() => CharacterPortraits, { name: 'portraits' })
  getPortraits(@Parent() character: Character) {
    return character.portraits;
  }
}
