import { Module } from '@nestjs/common';
import { CountriesResolver } from './resolvers/countries.resolver';
import { CountryFlagsModule } from '../country-flags/country-flags.module';
import { CountriesService } from './services/countries.service';

@Module({
  imports: [CountryFlagsModule],
  providers: [CountriesResolver, CountriesService],
  exports: [CountriesService],
})
export class CountriesModule {}
