import { Module } from '@nestjs/common';
import { IntelligenceAgenciesResolver } from './intelligence-agencies.resolver';

@Module({
  providers: [IntelligenceAgenciesResolver]
})
export class IntelligenceAgenciesModule {}
