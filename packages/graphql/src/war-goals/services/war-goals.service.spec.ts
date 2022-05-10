import { Test, TestingModule } from '@nestjs/testing';
import { WarGoalsService } from './war-goals.service';

describe('WarGoalsService', () => {
  let service: WarGoalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WarGoalsService],
    }).compile();

    service = module.get<WarGoalsService>(WarGoalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
