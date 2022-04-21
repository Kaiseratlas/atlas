import { Module } from '@nestjs/common';
import { StatesResolver } from './resolvers/states.resolver';
import { StateCategoriesModule } from '../state-categories/state-categories.module';

@Module({
  imports: [StateCategoriesModule],
  providers: [StatesResolver],
})
export class StatesModule {}
