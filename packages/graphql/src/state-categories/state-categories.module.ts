import { Module } from '@nestjs/common';
import { StateCategoriesResolver } from './state-categories.resolver';

@Module({
  providers: [StateCategoriesResolver]
})
export class StateCategoriesModule {}
