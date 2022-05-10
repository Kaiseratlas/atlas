import { Module } from '@nestjs/common';
import { StatesResolver } from './resolvers/states.resolver';
import { StateCategoriesModule } from '../state-categories/state-categories.module';
import { StatesService } from './services/states.service';

@Module({
  imports: [StateCategoriesModule],
  providers: [StatesResolver, StatesService],
})
export class StatesModule {}
