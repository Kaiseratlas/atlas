import { Module } from '@nestjs/common';
import { CountriesService } from './services/countries.service';
import { CountriesResolver } from './resolvers/countries.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryTag } from './entities/country-tag.entity';
import { CountryFlag } from './entities/country-flag.entity';
import { CountryHistory } from './entities/country-history.entity';
import { StatesModule } from '../states/states.module';
import { CountryHistoryResolver } from './resolvers/country-history.resolver';
import { IdeologiesModule } from '../ideologies/ideologies.module';
import { CountryPolitics } from './entities/country-politics';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CountryFlag,
      CountryTag,
      CountryHistory,
      CountryPolitics,
    ]),
    IdeologiesModule,
    StatesModule,
  ],
  providers: [CountriesService, CountriesResolver, CountryHistoryResolver],
})
export class CountriesModule {}
