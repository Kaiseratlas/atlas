import { Module } from '@nestjs/common';
import { BuildingsResolver } from './resolvers/buildings.resolver';
import { BuildingsService } from './services/buildings.service';

@Module({
  providers: [BuildingsResolver, BuildingsService],
  exports: [BuildingsService],
})
export class BuildingsModule {}
