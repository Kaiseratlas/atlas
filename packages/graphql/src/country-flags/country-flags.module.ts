import { Module } from '@nestjs/common';
import { CountryFlagsResolver } from './resolvers/country-flags.resolver';
import { CountryFlagsService } from './services/country-flags.service';

@Module({
  providers: [CountryFlagsResolver, CountryFlagsService],
  exports: [CountryFlagsService],
})
export class CountryFlagsModule {}
