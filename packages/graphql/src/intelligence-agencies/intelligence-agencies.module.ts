import { Module } from '@nestjs/common';
import { IntelligenceAgenciesResolver } from './resolvers/intelligence-agencies.resolver';

@Module({
  providers: [IntelligenceAgenciesResolver],
})
export class IntelligenceAgenciesModule {}
