import {
  Context,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { IntelligenceAgency } from '../models/intelligence-agency.model';
import { SpritesService } from '../../sprites/services/sprites.service';
import { ProductEntitiesResolver } from '../../shared/resolvers';
import { ParserService } from '../../parser';
import { Request } from 'express';

@Resolver(() => IntelligenceAgency)
export class IntelligenceAgenciesResolver extends ProductEntitiesResolver(
  IntelligenceAgency,
  {
    plural: 'intelligenceAgencies',
    getIdProperty: (ia) => ia['picture'],
  },
) {
  constructor(
    private readonly parserService: ParserService,
    private readonly spritesService: SpritesService,
  ) {
    super(parserService);
  }

  @ResolveField(() => String, { name: 'emblemUrl', nullable: true })
  async getEmblemUrl(
    @Context('req') req: Request,
    @Parent() intelligenceAgency: IntelligenceAgency,
  ) {
    const productName = req.get('x-product-name');
    const productVersion = req.get('x-product-version');
    const emblem = await intelligenceAgency.getEmblem();
    if (!emblem) {
      return null;
    }
    return this.spritesService.getUrl(productName, productVersion, emblem);
  }
}
