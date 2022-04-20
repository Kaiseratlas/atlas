import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mod } from './models/mod.model';

@Module({
  imports: [TypeOrmModule.forFeature([Mod])],
})
export class ModsModule {}
