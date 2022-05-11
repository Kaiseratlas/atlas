import { Module } from '@nestjs/common';
import { StateCategoriesResolver } from './resolvers/state-categories.resolver';
import { StateCategoriesService } from './services/state-categories.service';

@Module({
  providers: [StateCategoriesResolver, StateCategoriesService],
  exports: [StateCategoriesService],
})
export class StateCategoriesModule {}
