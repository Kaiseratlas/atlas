import { Test, TestingModule } from '@nestjs/testing';
import { DifficultySettingsResolver } from './difficulty-settings.resolver';

describe('DifficultySettingsResolver', () => {
  let resolver: DifficultySettingsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DifficultySettingsResolver],
    }).compile();

    resolver = module.get<DifficultySettingsResolver>(DifficultySettingsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
