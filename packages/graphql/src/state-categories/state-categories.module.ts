import { Module } from '@nestjs/common';
import { StateCategoriesResolver } from './resolvers/state-categories.resolver';

@Module({
  providers: [StateCategoriesResolver],
})
export class StateCategoriesModule {}
