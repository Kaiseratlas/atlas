import { Global, Module } from '@nestjs/common';
import { SpritesResolver } from './resolvers/sprites.resolver';
import { SpritesController } from './controllers/sprites.controller';
import { SpritesService } from './services/sprites.service';

@Global()
@Module({
  providers: [SpritesResolver, SpritesService],
  controllers: [SpritesController],
  exports: [SpritesService],
})
export class SpritesModule {}
