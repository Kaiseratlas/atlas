import { Args, ID, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Country } from './country.model';
import { Int, Query } from '@nestjs/graphql';
import Parser from '@kaiseratlas/parser';
import { InjectParser } from '../parser/parser.module';
import { CountryFlag } from '../country-flags/country-flag.model';
import { CountryFlagsService } from '../country-flags/country-flags.service';

@Resolver(() => Country)
export class CountriesResolver {
  constructor(
    @InjectParser() protected parser: Parser,
    private countryFlagsService: CountryFlagsService,
  ) {}

  @Query(() => Country, { name: 'country' })
  async getCountry(@Args('tag', { type: () => ID }) tag: string) {
    return this.parser.common.countries.get(tag);
  }

  @Query(() => [Country], { name: 'countries' })
  async getCountries() {
    const countries = await this.parser.common.countries.load();
    return countries.filter(
      (country) => !country.isDynamic && !['XXA', 'XXB'].includes(country.tag),
    );
  }

  @ResolveField(() => String, { name: 'currentFlag' })
  async getCurrentFlag(@Parent() country: Country) {
    // @ts-ignore
    const flag = await country.flags.getCurrent();
    return this.countryFlagsService.getUrl(flag);
  }

  @ResolveField(() => String, { name: 'formalName' })
  async getFormalName(@Parent() country: Country) {
    // @ts-ignore
    const localisation = await country.getCurrentName();
    if (!localisation) {
      return country.tag;
    }
    return localisation.value;
  }

  @ResolveField(() => String, { name: 'name' })
  async getDefaultName(@Parent() country: Country) {
    // @ts-ignore
    const localisation = await country.getDefaultName();
    if (!localisation) {
      return country.tag;
    }
    return localisation.value;
  }

  @ResolveField(() => Int, { name: 'manpower' })
  async getManpower(@Parent() country: Country) {
    // @ts-ignore
    return country.getManpower();
  }
  @ResolveField(() => [CountryFlag], { name: 'flags' })
  async getFlags(@Parent() country: Country) {
    // @ts-ignore
    return country.flags.load();
  }

  @ResolveField(() => Int, { name: 'researchSlots' })
  async getResearchSlots(@Parent() country: Country) {
    // @ts-ignore
    const history = await country.getHistory();
    return history.researchSlots;
  }
}
