import { Module } from '@nestjs/common';
import { CountriesModule } from './countries/countries.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { StatesModule } from './states/states.module';
import { StateCategoriesModule } from './state-categories/state-categories.module';
import { ParserModule } from './parser/parser.module';
import { EventsModule } from './events/events.module';
import { CountryFlagsModule } from './country-flags/country-flags.module';
import { IdeologiesModule } from './ideologies/ideologies.module';
import { CharactersModule } from './characters/characters.module';
import { ProvincesModule } from './provinces/provinces.module';
import { ContinentsModule } from './continents/continents.module';

@Module({
  imports: [
    CountriesModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    ParserModule.forRootAsync({
      useFactory: () => ({
        gamePath: 'C:\\Games\\Hearts of Iron IV No Step Back',
      }),
    }),
    StatesModule,
    StateCategoriesModule,
    EventsModule,
    CountryFlagsModule,
    IdeologiesModule,
    CharactersModule,
    ProvincesModule,
    ContinentsModule,
  ],
})
export class AppModule {}
