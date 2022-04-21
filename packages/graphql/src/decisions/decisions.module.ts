import { Module } from '@nestjs/common';
import { DecisionsResolver } from './resolvers/decisions.resolver';
import { DecisionCategoriesModule } from '../decision-categories/decision-categories.module';

@Module({
  imports: [DecisionCategoriesModule],
  providers: [DecisionsResolver],
})
export class DecisionsModule {}
