import { Module } from '@nestjs/common';
import { CountriesResolver } from './resolvers/countries.resolver';
import { CountryFlagsModule } from '../country-flags/country-flags.module';

@Module({
  imports: [CountryFlagsModule],
  providers: [CountriesResolver],
})
export class CountriesModule {}
