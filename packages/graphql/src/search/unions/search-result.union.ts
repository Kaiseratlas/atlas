import { createUnionType } from '@nestjs/graphql';
import { Country } from '../../countries/models/country.model';
import { Continent } from '../../continents/models/continent.model';
import { State } from '../../states/models/state.model';
import { Sprite } from '../../sprites/models/sprite.model';
import { Resource } from '../../resources/model/resource.model';
import { Ability } from '../../abilities/models/ability.model';
import { AutonomyState } from '../../autonomous-states/models/autonomy-state.model';
import { Bookmark } from '../../bookmarks/models/bookmark.model';
import { Building } from '../../buildings/models/building.model';
import { Character } from '../../characters/models/character.model';
import { Decision } from '../../decisions/models/decision.model';
import { DifficultySetting } from '../../difficulty-settings/models/difficulty-setting.model';
import { Event } from '../../events/event.model';
import { FocusTree } from '../../focus-trees/models/focus-tree.model';
import { Focus } from '../../focuses/models/focus.model';
import { GameRule } from '../../game-rules/models/game-rule.model';
import { Idea } from '../../ideas/models/idea.model';
import { Ideology } from '../../ideologies/models/ideology.model';
import { IntelligenceAgency } from '../../intelligence-agencies/models/intelligence-agency.model';
import { Province } from '../../provinces/models/province.model';
import { StateCategory } from '../../state-categories/models/state-category.model';
import { StrategicRegion } from '../../strategic-regions/models/strategic-region.model';
import { Technology } from '../../technologies/models/technology.model';
import { TerrainCategory } from '../../terrain-categories/models/terrain-category.model';
import { Unit } from '../../units/models/unit.model';
import { WarGoal } from '../../war-goals/models/war-goal.model';

export const SearchResultUnion = createUnionType({
  name: 'SearchResultUnion',
  types: () =>
    [
      Ability,
      AutonomyState,
      Bookmark,
      Building,
      Character,
      Continent,
      Country,
      Decision,
      DifficultySetting,
      Event,
      FocusTree,
      Focus,
      GameRule,
      Idea,
      Ideology,
      IntelligenceAgency,
      Province,
      Resource,
      Sprite,
      StateCategory,
      State,
      StrategicRegion,
      Technology,
      TerrainCategory,
      Unit,
      WarGoal,
    ] as const,
  resolveType(value) {
    return value.constructor.name;
  },
});
