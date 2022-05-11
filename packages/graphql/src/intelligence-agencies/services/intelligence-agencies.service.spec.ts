import { Test, TestingModule } from '@nestjs/testing';
import { IntelligenceAgenciesService } from './intelligence-agencies.service';

describe('IntelligenceAgenciesService', () => {
  let service: IntelligenceAgenciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IntelligenceAgenciesService],
    }).compile();

    service = module.get<IntelligenceAgenciesService>(IntelligenceAgenciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
