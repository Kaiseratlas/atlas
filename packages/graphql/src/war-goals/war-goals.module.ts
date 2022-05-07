import { Module } from '@nestjs/common';
import { WarGoalsResolver } from './resolvers/war-goals.resolver';

@Module({
  providers: [WarGoalsResolver]
})
export class WarGoalsModule {}
