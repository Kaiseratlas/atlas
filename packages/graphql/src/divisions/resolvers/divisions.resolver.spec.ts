import { Test, TestingModule } from '@nestjs/testing';
import { DivisionsResolver } from './divisions.resolver';

describe('DivisionsResolver', () => {
  let resolver: DivisionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DivisionsResolver],
    }).compile();

    resolver = module.get<DivisionsResolver>(DivisionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
