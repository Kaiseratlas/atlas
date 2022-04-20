import { Module } from '@nestjs/common';
import { GamesService } from './services/games.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameRepository } from './repositories/game.repository';

@Module({
  imports: [TypeOrmModule.forFeature([GameRepository])],
  providers: [GamesService],
  exports: [GamesService],
})
export class GamesModule {}
