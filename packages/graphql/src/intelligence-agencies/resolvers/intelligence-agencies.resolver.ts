import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { IntelligenceAgency } from '../models/intelligence-agency.model';
import { SpritesService } from '../../sprites/services/sprites.service';
import { ProductEntitiesResolver } from '../../shared/resolvers';
import { ParserService } from '../../parser';

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

  @Query(() => [IntelligenceAgency], { name: 'intelligenceAgencies' })
  getIntelligenceAgencies(): Promise<IntelligenceAgency[]> {
    return this.parser.common.IA.load();
  }

  @ResolveField(() => String, { name: 'emblemUrl', nullable: true })
  async getEmblemUrl(@Parent() intelligenceAgency: IntelligenceAgency) {
    const emblem = await intelligenceAgency.getEmblem();
    if (!emblem) {
      return null;
    }
    return this.spritesService.getUrl(emblem);
  }
}
