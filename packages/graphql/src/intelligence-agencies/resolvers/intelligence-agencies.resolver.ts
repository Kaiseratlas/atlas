import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectParser } from '../../parser/parser.module';
import type Parser from '@kaiseratlas/parser';
import { IntelligenceAgency } from '../models/intelligence-agency.model';
import { SpritesService } from '../../sprites/services/sprites.service';

@Resolver(() => IntelligenceAgency)
export class IntelligenceAgenciesResolver {
  constructor(
    @InjectParser() protected parser: Parser,
    private readonly spritesService: SpritesService,
  ) {}

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
