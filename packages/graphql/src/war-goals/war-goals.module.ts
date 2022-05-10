import { Module } from '@nestjs/common';
import { WarGoalsResolver } from './resolvers/war-goals.resolver';
import { WarGoalsService } from './services/war-goals.service';

@Module({
  providers: [WarGoalsResolver, WarGoalsService],
  exports: [WarGoalsService],
})
export class WarGoalsModule {}
