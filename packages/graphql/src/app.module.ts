import { Module } from '@nestjs/common';
import { CountriesModule } from './countries/countries.module';
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
import { ResourcesModule } from './resources/resources.module';
import { TerrainCategoriesModule } from './terrain-categories/terrain-categories.module';
import { ProductsModule } from './products/products.module';
import { GamesModule } from './games/games.module';
import { SharedModule } from './shared/shared.module';
import { StrategicRegionsModule } from './strategic-regions/strategic-regions.module';
import { AutonomousStatesModule } from './autonomous-states/autonomous-states.module';
import { AbilitiesModule } from './abilities/abilities.module';
import { FocusTreesModule } from './focus-trees/focus-trees.module';
import { ModsModule } from './mods/mods.module';

@Module({
  imports: [
    CountriesModule,
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
    ResourcesModule,
    TerrainCategoriesModule,
    ProductsModule,
    GamesModule,
    SharedModule,
    StrategicRegionsModule,
    AutonomousStatesModule,
    AbilitiesModule,
    FocusTreesModule,
    ModsModule,
  ],
})
export class AppModule {}
