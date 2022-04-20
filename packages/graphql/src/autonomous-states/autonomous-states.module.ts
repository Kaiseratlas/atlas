import { Module } from '@nestjs/common';
import { AutonomousStatesResolver } from './resolvers/autonomous-states.resolver';

@Module({
  providers: [AutonomousStatesResolver]
})
export class AutonomousStatesModule {}
