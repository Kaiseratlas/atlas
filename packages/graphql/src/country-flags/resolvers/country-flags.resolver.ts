import { ResolveField, Resolver, Parent } from '@nestjs/graphql';
import { CountryFlag } from '../models/country-flag.model';
import { CountryFlagsService } from '../services/country-flags.service';
import { ParserService } from '../../parser/services/parser.service';

@Resolver(() => CountryFlag)
export class CountryFlagsResolver {
  constructor(
    private readonly parserService: ParserService,
    private readonly countryFlagsService: CountryFlagsService,
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
