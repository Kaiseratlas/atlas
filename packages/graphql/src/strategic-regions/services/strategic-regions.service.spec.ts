import { Test, TestingModule } from '@nestjs/testing';
import { StrategicRegionsService } from './strategic-regions.service';

describe('StrategicRegionsService', () => {
  let service: StrategicRegionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StrategicRegionsService],
    }).compile();

    service = module.get<StrategicRegionsService>(StrategicRegionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
