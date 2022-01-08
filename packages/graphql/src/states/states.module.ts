import { Module } from '@nestjs/common';
import { StatesResolver } from './resolvers/states.resolver';
import { StatesService } from './services/states.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as models from './models';
import { StatesCommand } from './commands/states.command';
import { StateHistoryResolver } from './resolvers/state-history.resolver';

@Module({
  imports: [TypeOrmModule.forFeature(Object.values(models))],
  providers: [
    StatesCommand,
    StatesResolver,
    StateHistoryResolver,
    StatesService,
  ],
  exports: [StatesService],
})
export class StatesModule {}
