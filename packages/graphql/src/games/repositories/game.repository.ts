import { EntityRepository, Repository } from 'typeorm';
import { Game } from '../models/game.model';
import * as Parser from '@kaiseratlas/parser';

@EntityRepository(Game)
export class GameRepository extends Repository<Game> {
  private static transform(game: Game): Game {
    return Object.assign(
      game,
      Parser.Game.fromPath(game.path, {
        modPath: game.customModPath ?? undefined,
      }),
    );
  }

  async find(o?): Promise<Game[]> {
    const games = await super.find(o);
    return games.map(GameRepository.transform);
  }
}
