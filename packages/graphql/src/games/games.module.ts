import { Module } from '@nestjs/common';
import { GamesService } from './services/games.service';

@Module({
  providers: [GamesService]
})
export class GamesModule {}
