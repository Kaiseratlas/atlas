import { Test, TestingModule } from '@nestjs/testing';
import { StrategicRegionsResolver } from './strategic-regions.resolver';

describe('StrategicRegionsResolver', () => {
  let resolver: StrategicRegionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StrategicRegionsResolver],
    }).compile();

    resolver = module.get<StrategicRegionsResolver>(StrategicRegionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
