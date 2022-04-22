import { Test, TestingModule } from '@nestjs/testing';
import { TechnologiesResolver } from './technologies.resolver';

describe('TechnologiesResolver', () => {
  let resolver: TechnologiesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TechnologiesResolver],
    }).compile();

    resolver = module.get<TechnologiesResolver>(TechnologiesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
