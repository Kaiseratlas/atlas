import { ResolveField, Resolver, Parent } from '@nestjs/graphql';
import { InjectParser } from '../parser/parser.module';
import Parser from '@kaiseratlas/parser';
import { CountryFlag } from './country-flag.model';
import { CountryFlagsService } from './country-flags.service';

@Resolver(() => CountryFlag)
export class CountryFlagsResolver {
  constructor(
    @InjectParser() protected parser: Parser,
    private countryFlagsService: CountryFlagsService,
  ) {}

  @ResolveField(() => String, { name: 'url' })
  getUrl(@Parent() countryFlag: CountryFlag) {
    return this.countryFlagsService.getUrl(countryFlag);
  }
}
