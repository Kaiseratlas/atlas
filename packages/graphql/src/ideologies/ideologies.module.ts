import { Module } from '@nestjs/common';
import { IdeologiesResolver } from './ideologies.resolver';

@Module({
  providers: [IdeologiesResolver],
})
export class IdeologiesModule {}
