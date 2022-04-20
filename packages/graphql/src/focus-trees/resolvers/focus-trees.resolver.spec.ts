import { Test, TestingModule } from '@nestjs/testing';
import { FocusTreesResolver } from './focus-trees.resolver';

describe('FocusTreesResolver', () => {
  let resolver: FocusTreesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FocusTreesResolver],
    }).compile();

    resolver = module.get<FocusTreesResolver>(FocusTreesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
