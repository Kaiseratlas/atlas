import { Test, TestingModule } from '@nestjs/testing';
import { TerrainCategoriesResolver } from './terrain-categories.resolver';

describe('TerrainCategoriesResolver', () => {
  let resolver: TerrainCategoriesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TerrainCategoriesResolver],
    }).compile();

    resolver = module.get<TerrainCategoriesResolver>(TerrainCategoriesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
