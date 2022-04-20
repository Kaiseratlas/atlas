import { Module } from '@nestjs/common';
import { StrategicRegionsResolver } from './resolvers/strategic-regions.resolver';

@Module({
  providers: [StrategicRegionsResolver]
})
export class StrategicRegionsModule {}
