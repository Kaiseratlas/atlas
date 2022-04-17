import { Test, TestingModule } from '@nestjs/testing';
import { IntelligenceAgenciesResolver } from './intelligence-agencies.resolver';

describe('IntelligenceAgenciesResolver', () => {
  let resolver: IntelligenceAgenciesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IntelligenceAgenciesResolver],
    }).compile();

    resolver = module.get<IntelligenceAgenciesResolver>(IntelligenceAgenciesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
