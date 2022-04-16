import { Module } from '@nestjs/common';
import { IdeologiesResolver } from './resolvers/ideologies.resolver';

@Module({
  providers: [IdeologiesResolver],
})
export class IdeologiesModule {}
