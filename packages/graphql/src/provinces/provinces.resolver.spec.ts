import { Test, TestingModule } from '@nestjs/testing';
import { ProvincesResolver } from './provinces.resolver';

describe('ProvincesResolver', () => {
  let resolver: ProvincesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProvincesResolver],
    }).compile();

    resolver = module.get<ProvincesResolver>(ProvincesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
