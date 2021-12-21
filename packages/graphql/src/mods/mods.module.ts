import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mod } from './models/mod.model';
import { ModsResolver } from './resolvers/mods.resolver';
import { ModsService } from './services/mods.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Mod])],
  providers: [ModsResolver, ModsService],
  exports: [ModsService],
})
export class ModsModule {}
