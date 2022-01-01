import { Module } from '@nestjs/common';
import { MapCommand } from './map.command';

@Module({
  providers: [MapCommand],
})
export class MapModule {}
