import { Test, TestingModule } from '@nestjs/testing';
import { SpritesService } from './sprites.service';

describe('SpritesService', () => {
  let service: SpritesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpritesService],
    }).compile();

    service = module.get<SpritesService>(SpritesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
