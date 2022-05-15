import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Character } from '../models/character.model';
import { CharacterRoleUnion } from '../unions/character-role.union';
import { CharacterPortraits } from '../models/character-portraits.model';
import { ProductEntitiesResolver } from '../../shared/resolvers';

@Resolver(() => Character)
export class CharactersResolver extends ProductEntitiesResolver(Character, {
  plural: 'characters',
}) {
  @ResolveField(() => String, { name: 'name' })
  async getName(@Parent() character: Character) {
    const localisation = await character.getName();
    if (!localisation) {
      return character['name'];
    }
    return localisation.value;
  }

  @ResolveField(() => [CharacterRoleUnion], { name: 'roles' })
  getRoles(@Parent() character: Character) {
    return character.roles;
  }

  @ResolveField(() => CharacterPortraits, { name: 'portraits' })
  getPortraits(@Parent() character: Character) {
    return character.portraits;
  }
}
