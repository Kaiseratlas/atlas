import { Module } from '@nestjs/common';
import { CountriesService } from './services/countries.service';
import { CountriesResolver } from './resolvers/countries.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryTag } from './models/country-tag.model';
import { CountryFlag } from './models/country-flag.model';
import { CountryHistory } from './models/country-history.model';
import { StatesModule } from '../states/states.module';
import { CountryHistoryResolver } from './resolvers/country-history.resolver';
import { IdeologiesModule } from '../ideologies/ideologies.module';
import { CountryPolitics } from './models/country-politics.model';
import * as commands from './commands';
import * as services from './services';
import * as resolvers from './resolvers';
import {
  CountryLeader,
  CountryPopularity,
  CountryFieldMarshal,
  CountryCorpsCommander,
  CountryNavyLeader,
  CountryIdea,
  CountryEvent,
} from './models';
import { IdeasModule } from '../ideas/ideas.module';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CountryFlag,
      CountryTag,
      CountryHistory,
      CountryPolitics,
      CountryLeader,
      CountryPopularity,
      CountryFieldMarshal,
      CountryCorpsCommander,
      CountryNavyLeader,
      CountryIdea,
      CountryEvent,
    ]),
    IdeologiesModule,
    IdeasModule,
    StatesModule,
    EventsModule,
  ],
  providers: [
    CountriesService,
    CountriesResolver,
    CountryHistoryResolver,
    ...Object.values(commands),
    ...Object.values(services),
    ...Object.values(resolvers),
  ],
})
export class CountriesModule {}

