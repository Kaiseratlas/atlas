import { Test, TestingModule } from '@nestjs/testing';
import { AbilitiesResolver } from './abilities.resolver';

describe('AbilitiesResolver', () => {
  let resolver: AbilitiesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AbilitiesResolver],
    }).compile();

    resolver = module.get<AbilitiesResolver>(AbilitiesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
