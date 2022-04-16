import { ResolveField, Resolver, Parent } from '@nestjs/graphql';
import { InjectParser } from '../../parser/parser.module';
import Parser from '@kaiseratlas/parser';
import { CountryFlag } from '../models/country-flag.model';
import { CountryFlagsService } from '../services/country-flags.service';

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

  @ResolveField(() => String, { name: 'name' })
  async getName(@Parent() countryFlag: CountryFlag) {
    const localisation = await countryFlag.getName();
    if (!localisation) {
      return '????';
    }
    return localisation.value;
  }
}
