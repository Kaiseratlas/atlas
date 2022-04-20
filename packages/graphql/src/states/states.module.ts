import { Module } from '@nestjs/common';
import { StatesResolver } from './resolvers/states.resolver';

@Module({
  providers: [StatesResolver],
})
export class StatesModule {}
