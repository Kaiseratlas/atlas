import {
  Ability,
  AutonomyState,
  Bookmark,
  Building,
  Character,
  Continent,
  Country,
  Decision,
  DifficultySetting,
  Idea,
  Sprite,
  State,
  Resource,
  Focus,
  GameRule,
  Ideology,
  IntelligenceAgency as IA,
  Province,
  StateCategory,
  StrategicRegion,
  Technology,
  TerrainCategory,
  Unit,
  WarGoal,
} from '@kaiseratlas/parser';

export function getClassByIndex(index: string): any {
  switch (index) {
    case 'abilities': {
      return Ability;
    }
    case 'autonomous_states': {
      return AutonomyState;
    }
    case 'bookmarks': {
      return Bookmark;
    }
    case 'buildings': {
      return Building;
    }
    case 'characters': {
      return Character;
    }
    case 'continents': {
      return Continent;
    }
    case 'countries': {
      return Country;
    }
    case 'decisions': {
      return Decision;
    }
    case 'decision_categories': {
      return Decision.Category;
    }
    case 'difficulty_settings': {
      return DifficultySetting;
    }
    case 'focuses': {
      return Focus;
    }
    case 'game_rules': {
      return GameRule;
    }
    case 'ideas': {
      return Idea;
    }
    case 'ideologies': {
      return Ideology;
    }
    case 'intelligence_agencies': {
      return IA;
    }
    case 'province': {
      return Province;
    }
    case 'resources': {
      return Resource;
    }
    case 'sprites': {
      return Sprite;
    }
    case 'state_categories': {
      return StateCategory;
    }
    case 'states': {
      return State;
    }
    case 'strategic_regions': {
      return StrategicRegion;
    }
    case 'technologies': {
      return Technology;
    }
    case 'terrain_categories': {
      return TerrainCategory;
    }
    case 'units': {
      return Unit;
    }
    case 'unit_categories': {
      return Unit.Category;
    }
    case 'equipments': {
      return Unit.Equipment;
    }
    case 'war_goals': {
      return WarGoal;
    }
  }
}
