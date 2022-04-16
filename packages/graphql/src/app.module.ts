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
import { SpritesModule } from './sprites/sprites.module';
import { CharacterPortraitsModule } from './character-portraits/character-portraits.module';
import { BuildingsModule } from './buildings/buildings.module';
import { IntelligenceAgenciesModule } from './intelligence-agencies/intelligence-agencies.module';

@Module({
  imports: [
    CountriesModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    ParserModule.forRootAsync({
      useFactory: () => ({
        gamePath: '/Volumes/Windows/Games/Hearts of Iron IV No Step Back',
        modPath: '/Volumes/Windows/Users/pstra/Documents/Paradox Interactive/Hearts of Iron IV/mod'
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
    SpritesModule,
    CharacterPortraitsModule,
    BuildingsModule,
    IntelligenceAgenciesModule,
  ],
})
export class AppModule {}
