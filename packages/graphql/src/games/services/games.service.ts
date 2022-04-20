import { Injectable } from '@nestjs/common';
import { Game } from '../models/game.model';
import { GameRepository } from '../repositories/game.repository';

@Injectable()
export class GamesService {
  constructor(private gameRepository: GameRepository) {}

  findAll(): Promise<Game[]> {
    return this.gameRepository.find();
  }
}
