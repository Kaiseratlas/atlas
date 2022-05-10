import { Continent, Country, Sprite, State, Resource } from '@kaiseratlas/parser';

export function getClassByIndex(index: string): any {
  switch (index) {
    case 'continents': {
      return Continent;
    }
    case 'countries': {
      return Country;
    }
    case 'resources': {
      return Resource;
    }
    case 'sprites': {
      return Sprite;
    }
    case 'states': {
      return State;
    }
  }
}
