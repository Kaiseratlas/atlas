import { Test, TestingModule } from '@nestjs/testing';
import { TerrainCategoriesService } from './terrain-categories.service';

describe('TerrainCategoriesService', () => {
  let service: TerrainCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TerrainCategoriesService],
    }).compile();

    service = module.get<TerrainCategoriesService>(TerrainCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
