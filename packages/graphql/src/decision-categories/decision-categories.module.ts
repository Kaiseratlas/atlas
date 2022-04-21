import { Module } from '@nestjs/common';
import { DecisionCategoriesResolver } from './resolvers/decision-categories.resolver';

@Module({
  providers: [DecisionCategoriesResolver]
})
export class DecisionCategoriesModule {}
