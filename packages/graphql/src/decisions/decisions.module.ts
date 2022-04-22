import { Module } from '@nestjs/common';
import { DecisionsResolver } from './resolvers/decisions.resolver';
import { DecisionCategoriesResolver } from './resolvers/decision-categories.resolver';

@Module({
  providers: [DecisionsResolver, DecisionCategoriesResolver],
})
export class DecisionsModule {}
