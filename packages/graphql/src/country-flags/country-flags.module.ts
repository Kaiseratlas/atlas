import { Module } from '@nestjs/common';
import { CountryFlagsResolver } from './country-flags.resolver';

@Module({
  providers: [CountryFlagsResolver]
})
export class CountryFlagsModule {}
