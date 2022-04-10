import { Module } from '@nestjs/common';
import { CountriesResolver } from './countries.resolver';
import { FlagsController } from './flags.controller';

@Module({
  providers: [CountriesResolver],
  controllers: [FlagsController],
})
export class CountriesModule {}
