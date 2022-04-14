import { Module } from '@nestjs/common';
import { CountriesResolver } from './countries.resolver';
import { FlagsController } from './flags.controller';
import { CountryFlagsModule } from '../country-flags/country-flags.module';

@Module({
  imports: [CountryFlagsModule],
  providers: [CountriesResolver],
  controllers: [FlagsController],
})
export class CountriesModule {}
