import { Module } from '@nestjs/common';
import { CountriesModule } from './countries/countries.module';
import { StatesModule } from './states/states.module';
import { ParserModule } from './parser';
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
import { DecisionsModule } from './decisions/decisions.module';
import { TechnologiesModule } from './technologies/technologies.module';
import { GameRulesModule } from './game-rules/game-rules.module';
import { DifficultySettingsModule } from './difficulty-settings/difficulty-settings.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { UnitsModule } from './units/units.module';
import { DivisionsModule } from './divisions/divisions.module';
import { WarGoalsModule } from './war-goals/war-goals.module';
import { FocusesModule } from './focuses/focuses.module';
import { SearchModule } from './search/search.module';
import { IdeasModule } from './ideas/ideas.module';

@Module({
  imports: [
    CountriesModule,
    ParserModule,
    StatesModule,
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
    DecisionsModule,
    TechnologiesModule,
    GameRulesModule,
    DifficultySettingsModule,
    BookmarksModule,
    UnitsModule,
    DivisionsModule,
    WarGoalsModule,
    FocusesModule,
    SearchModule,
    IdeasModule,
  ],
})
export class AppModule {}
