import { Query, Resolver } from '@nestjs/graphql';
import { Building } from '../models/building.model';
import { InjectParser } from '../../parser/parser.module';
import Parser from '@kaiseratlas/parser';

@Resolver(() => Building)
export class BuildingsResolver {
  constructor(@InjectParser() protected parser: Parser) {}

  @Query(() => [Building], { name: 'buildings' })
  getBuildings(): Promise<Building[]> {
    return this.parser.common.buildings.load();
  }
}
