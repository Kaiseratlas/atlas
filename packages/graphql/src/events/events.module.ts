import { Module } from '@nestjs/common';
import { EventsService } from './services/events.service';
import * as resolvers from './resolvers';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as models from './models';
import { EventsCommand } from './commands/events.command';

@Module({
  imports: [TypeOrmModule.forFeature(Object.values(models))],
  providers: [EventsService, ...Object.values(resolvers), EventsCommand],
  exports: [EventsService],
})
export class EventsModule {}
