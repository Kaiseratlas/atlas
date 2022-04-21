import { Test, TestingModule } from '@nestjs/testing';
import { DecisionCategoriesResolver } from './decision-categories.resolver';

describe('DecisionCategoriesResolver', () => {
  let resolver: DecisionCategoriesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DecisionCategoriesResolver],
    }).compile();

    resolver = module.get<DecisionCategoriesResolver>(DecisionCategoriesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
