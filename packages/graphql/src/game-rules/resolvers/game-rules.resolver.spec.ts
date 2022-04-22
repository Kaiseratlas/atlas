import { Test, TestingModule } from '@nestjs/testing';
import { GameRulesResolver } from './game-rules.resolver';

describe('GameRulesResolver', () => {
  let resolver: GameRulesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameRulesResolver],
    }).compile();

    resolver = module.get<GameRulesResolver>(GameRulesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
