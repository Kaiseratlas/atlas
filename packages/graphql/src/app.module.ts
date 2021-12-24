import { Module } from '@nestjs/common';
import { CountriesModule } from './countries/countries.module';
import { SharedModule } from './shared/shared.module';
import { ModsModule } from './mods/mods.module';
import { IdeologiesModule } from './ideologies/ideologies.module';
import { StatesModule } from './states/states.module';
import { IdeasModule } from './ideas/ideas.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [CountriesModule, SharedModule, ModsModule, IdeologiesModule, StatesModule, IdeasModule, EventsModule],
})
export class AppModule {}
