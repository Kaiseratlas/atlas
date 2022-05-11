import { Module } from '@nestjs/common';
import { AutonomousStatesResolver } from './resolvers/autonomous-states.resolver';
import { AutonomousStatesService } from './services/autonomous-states.service';

@Module({
  providers: [AutonomousStatesResolver, AutonomousStatesService],
  exports: [AutonomousStatesService],
})
export class AutonomousStatesModule {}
