import { Module } from '@nestjs/common';
import { CountriesService } from './services/countries.service';
import { CountriesResolver } from './resolvers/countries.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryTag } from './entities/country-tag.entity';
import { CountryFlag } from './entities/country-flag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CountryFlag, CountryTag])],
  providers: [CountriesService, CountriesResolver],
})
export class CountriesModule {}
