import { Module } from '@nestjs/common';
import { GameRulesService } from './services/game-rules.service';
import * as resolvers from './resolvers';

@Module({
  providers: [...Object.values(resolvers), GameRulesService],
  exports: [GameRulesService],
})
export class GameRulesModule {}
