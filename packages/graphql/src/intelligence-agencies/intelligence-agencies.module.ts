import { Module } from '@nestjs/common';
import { IntelligenceAgenciesResolver } from './resolvers/intelligence-agencies.resolver';
import { IntelligenceAgenciesService } from './services/intelligence-agencies.service';

@Module({
  providers: [IntelligenceAgenciesResolver, IntelligenceAgenciesService],
  exports: [IntelligenceAgenciesService],
})
export class IntelligenceAgenciesModule {}
