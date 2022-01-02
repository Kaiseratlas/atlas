import { Global, Module } from '@nestjs/common';
import { SpritesService } from './services/sprites.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sprite } from './models/sprite.model';
import { SpritesCommand } from './commands/sprites.command';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Sprite])],
  providers: [SpritesService, SpritesCommand],
  exports: [SpritesService],
})
export class SpritesModule {}
