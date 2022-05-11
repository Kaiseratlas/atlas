import { Test, TestingModule } from '@nestjs/testing';
import { FocusTreesService } from './focus-trees.service';

describe('FocusTreesService', () => {
  let service: FocusTreesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FocusTreesService],
    }).compile();

    service = module.get<FocusTreesService>(FocusTreesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
