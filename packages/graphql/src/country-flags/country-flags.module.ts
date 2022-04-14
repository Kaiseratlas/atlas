import { Module } from '@nestjs/common';
import { CountryFlagsResolver } from './country-flags.resolver';
import { CountryFlagsService } from './country-flags.service';

@Module({
  providers: [CountryFlagsResolver, CountryFlagsService],
  exports: [CountryFlagsService],
})
export class CountryFlagsModule {}
