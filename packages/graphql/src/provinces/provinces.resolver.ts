import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { InjectParser } from '../parser/parser.module';
import Parser from '@kaiseratlas/parser';
import { Province } from './province.model';
import { Continent } from '../continents/continent.model';
import { State } from '../states/state.model';

@Resolver(() => Province)
export class ProvincesResolver {
  constructor(@InjectParser() protected parser: Parser) {}

  @Query(() => [Province], { name: 'provinces' })
  getProvinces() {
    return this.parser.map.provinces.load();
  }

  @ResolveField(() => Continent, { name: 'continent', nullable: true })
  async getContinent(@Parent() province: Province) {
    return province.getContinent();
  }

  @ResolveField(() => State, { name: 'state', nullable: true })
  async getState(@Parent() province: Province) {
    return province.getState();
  }
}
