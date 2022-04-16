import { Module } from '@nestjs/common';
import { BuildingsResolver } from './resolvers/buildings.resolver';

@Module({
  providers: [BuildingsResolver]
})
export class BuildingsModule {}
