import { Test, TestingModule } from '@nestjs/testing';
import { CharacterPortraitsResolver } from './character-portraits.resolver';

describe('CharacterPortraitsResolver', () => {
  let resolver: CharacterPortraitsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharacterPortraitsResolver],
    }).compile();

    resolver = module.get<CharacterPortraitsResolver>(CharacterPortraitsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
