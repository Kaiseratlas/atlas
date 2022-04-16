import { Test, TestingModule } from '@nestjs/testing';
import { SpritesResolver } from './sprites.resolver';

describe('SpritesResolver', () => {
  let resolver: SpritesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpritesResolver],
    }).compile();

    resolver = module.get<SpritesResolver>(SpritesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
