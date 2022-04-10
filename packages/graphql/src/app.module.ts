import { Module } from '@nestjs/common';
import { CountriesModule } from './countries/countries.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { StatesModule } from './states/states.module';
import { StateCategoriesModule } from './state-categories/state-categories.module';
import { ParserModule } from './parser/parser.module';
import { EventsModule } from './events/events.module';
import { CountryFlagsModule } from './country-flags/country-flags.module';

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
  ],
})
export class AppModule {}
