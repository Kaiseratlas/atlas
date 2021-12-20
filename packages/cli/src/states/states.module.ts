import { Module } from '@nestjs/common';
import { StatesService } from './services/states.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { State } from './entities/state.entity';
import { StateCommand } from './commands/state.command';
import { StateRefreshCommand } from './commands/state-refresh-command';

@Module({
  imports: [TypeOrmModule.forFeature([State])],
  providers: [StatesService, StateCommand, StateRefreshCommand],
})
export class StatesModule {}
