import { ResolveField, Resolver, Parent } from '@nestjs/graphql';
import { InjectParser } from '../parser/parser.module';
import Parser from '@kaiseratlas/parser';
import { CountryFlag } from './country-flag.model';

@Resolver(() => CountryFlag)
export class CountryFlagsResolver {
  constructor(@InjectParser() protected parser: Parser) {}

  @ResolveField(() => String, { name: 'url' })
  getUrl(@Parent() countryFlag: CountryFlag) {
    const flagUrl = new URL(
      `/flags/${countryFlag['country']['tag']}`,
      'http://localhost:3000',
    );
    if (countryFlag.variant) {
      flagUrl.searchParams.append('variant', countryFlag.variant);
    }

    return flagUrl.toString();
  }
}
