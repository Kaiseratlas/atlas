import { Test, TestingModule } from '@nestjs/testing';
import { StateCategoriesService } from './state-categories.service';

describe('StateCategoriesService', () => {
  let service: StateCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StateCategoriesService],
    }).compile();

    service = module.get<StateCategoriesService>(StateCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
