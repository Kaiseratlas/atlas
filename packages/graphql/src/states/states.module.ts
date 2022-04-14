import { Module } from '@nestjs/common';
import { StatesResolver } from './states.resolver';

@Module({
  providers: [StatesResolver],
})
export class StatesModule {}
