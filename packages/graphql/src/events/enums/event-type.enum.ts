import { registerEnumType } from '@nestjs/graphql';

export enum EventType {
  COUNTRY_EVENT = 'country_event',
  NEWS_EVENT = 'news_event',
  UNIT_LEADER_EVENT = 'unit_leader_event',
  STATE_EVENT = 'state_event',
  OPERATIVE_LEADER_EVENT = 'operative_leader_event',
}

registerEnumType(EventType, {
  name: 'EventType',
});
