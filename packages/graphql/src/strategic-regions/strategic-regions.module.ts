import { Module } from '@nestjs/common';
import { StrategicRegionsResolver } from './resolvers/strategic-regions.resolver';
import { StrategicRegionsService } from './services/strategic-regions.service';

@Module({
  providers: [StrategicRegionsResolver, StrategicRegionsService],
  exports: [StrategicRegionsService],
})
export class StrategicRegionsModule {}
