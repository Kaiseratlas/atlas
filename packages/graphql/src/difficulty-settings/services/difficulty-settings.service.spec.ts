import { Test, TestingModule } from '@nestjs/testing';
import { DifficultySettingsService } from './difficulty-settings.service';

describe('DifficultySettingsService', () => {
  let service: DifficultySettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DifficultySettingsService],
    }).compile();

    service = module.get<DifficultySettingsService>(DifficultySettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
