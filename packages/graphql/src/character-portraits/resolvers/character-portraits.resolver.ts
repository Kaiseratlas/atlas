import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CharacterPortrait } from '../../characters/models/character-portrait.model';
import { CharacterPortraitsService } from '../services/character-portraits.service';

@Resolver(() => CharacterPortrait)
export class CharacterPortraitsResolver {
  constructor(
    private readonly characterPortraitsService: CharacterPortraitsService,
  ) {}

  @ResolveField(() => String, { name: 'large', nullable: true })
  getLargeUrl(@Parent() characterPortrait: CharacterPortrait | null) {
    if (!characterPortrait) {
      return null;
    }
    return this.characterPortraitsService.getUrl(
      characterPortrait.character,
      characterPortrait.type,
      'large',
    );
  }

  @ResolveField(() => String, { name: 'small', nullable: true })
  getSmallUrl(@Parent() characterPortrait: CharacterPortrait | null) {
    if (!characterPortrait) {
      return null;
    }
    return this.characterPortraitsService.getUrl(
      characterPortrait.character,
      characterPortrait.type,
      'small',
    );
  }
}
