import { Test, TestingModule } from '@nestjs/testing';
import { DecisionsResolver } from './decisions.resolver';

describe('DecisionsResolver', () => {
  let resolver: DecisionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DecisionsResolver],
    }).compile();

    resolver = module.get<DecisionsResolver>(DecisionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
