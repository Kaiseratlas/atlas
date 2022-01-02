import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mod } from './models/mod.model';
import * as resolvers from './resolvers';
import { ModsService } from './services/mods.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Mod])],
  providers: [...Object.values(resolvers), ModsService],
  exports: [ModsService],
})
export class ModsModule {}
