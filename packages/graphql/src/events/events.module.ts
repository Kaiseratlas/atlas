import { Module } from '@nestjs/common';
import { EventsService } from './services/events.service';
import { EventsResolver } from './resolvers/events.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './models/event.model';
import { EventsCommand } from './commands/events.command';
import { EventText } from './models/event-text.model';
import { EventOption } from './models/event-option.model';

@Module({
  imports: [TypeOrmModule.forFeature([Event, EventText, EventOption])],
  providers: [EventsService, EventsResolver, EventsCommand],
})
export class EventsModule {}
