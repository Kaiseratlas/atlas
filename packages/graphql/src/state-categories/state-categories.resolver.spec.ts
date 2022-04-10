import { Test, TestingModule } from '@nestjs/testing';
import { StateCategoriesResolver } from './state-categories.resolver';

describe('StateCategoriesResolver', () => {
  let resolver: StateCategoriesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StateCategoriesResolver],
    }).compile();

    resolver = module.get<StateCategoriesResolver>(StateCategoriesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
