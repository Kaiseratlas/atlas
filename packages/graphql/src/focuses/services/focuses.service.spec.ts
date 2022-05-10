import { Test, TestingModule } from '@nestjs/testing';
import { FocusesService } from './focuses.service';

describe('FocusesService', () => {
  let service: FocusesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FocusesService],
    }).compile();

    service = module.get<FocusesService>(FocusesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
