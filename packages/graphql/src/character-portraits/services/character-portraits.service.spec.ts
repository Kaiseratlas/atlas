import { Test, TestingModule } from '@nestjs/testing';
import { CharacterPortraitsService } from './character-portraits.service';

describe('CharacterPortraitsService', () => {
  let service: CharacterPortraitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CharacterPortraitsService],
    }).compile();

    service = module.get<CharacterPortraitsService>(CharacterPortraitsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
