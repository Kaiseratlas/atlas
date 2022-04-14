import { Test, TestingModule } from '@nestjs/testing';
import { ContinentsResolver } from './continents.resolver';

describe('ContinentsResolver', () => {
  let resolver: ContinentsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContinentsResolver],
    }).compile();

    resolver = module.get<ContinentsResolver>(ContinentsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
