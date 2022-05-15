import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CharacterPortrait } from '../../characters/models/character-portrait.model';
import { CharacterPortraitsService } from '../services/character-portraits.service';
import { Request } from 'express';

@Resolver(() => CharacterPortrait)
export class CharacterPortraitsResolver {
  constructor(
    private readonly characterPortraitsService: CharacterPortraitsService,
  ) {}

  @ResolveField(() => String, { name: 'large', nullable: true })
  getLargeUrl(
    @Context('req') req: Request,
    @Parent() characterPortrait: CharacterPortrait | null,
  ) {
    if (!characterPortrait) {
      return null;
    }
    const productName = req.get('x-product-name');
    const productVersion = req.get('x-product-version');
    return this.characterPortraitsService.getUrl(
      productName,
      productVersion,
      characterPortrait.character,
      characterPortrait.type,
      'large',
    );
  }

  @ResolveField(() => String, { name: 'small', nullable: true })
  getSmallUrl(
    @Context('req') req: Request,
    @Parent() characterPortrait: CharacterPortrait | null,
  ) {
    if (!characterPortrait) {
      return null;
    }
    const productName = req.get('x-product-name');
    const productVersion = req.get('x-product-version');
    return this.characterPortraitsService.getUrl(
      productName,
      productVersion,
      characterPortrait.character,
      characterPortrait.type,
      'small',
    );
  }
}
