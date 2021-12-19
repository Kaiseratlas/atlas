import { Global, Module } from '@nestjs/common';
import { ModsService } from './services/mods.service';
import { ModCommand } from './commands/mod.command';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mod } from './entities/mod.entity';
import { ModRefreshCommand } from './commands/mod-refresh.command';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Mod])],
  providers: [ModsService, ModCommand, ModRefreshCommand],
  exports: [ModsService],
})
export class ModsModule {}
