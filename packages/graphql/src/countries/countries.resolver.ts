import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Country } from './country.model';
import { Field, ID, Int, Query } from '@nestjs/graphql';
import Parser from '@kaiseratlas/parser';
import { OnModuleInit } from '@nestjs/common';
import { InjectParser } from '../parser/parser.module';
import { CountryFlag } from '../country-flags/country-flag.model';

@Resolver(() => Country)
export class CountriesResolver {
  constructor(@InjectParser() protected parser: Parser) {}

  @Query(() => [Country], { name: 'countries' })
  async getCountries() {
    const countries = await this.parser.common.countries.load();
    return countries.filter(
      (country) => !country.isDynamic && !['XXA', 'XXB'].includes(country.tag),
    );
  }

  @ResolveField(() => String, { name: 'name' })
  async getCurrentName(@Parent() country: Country) {
    // @ts-ignore
    const localisation = await country.getCurrentName();
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
}
