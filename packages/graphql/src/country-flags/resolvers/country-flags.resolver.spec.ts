import { Test, TestingModule } from '@nestjs/testing';
import { CountryFlagsResolver } from './country-flags.resolver';

describe('CountryFlagsResolver', () => {
  let resolver: CountryFlagsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CountryFlagsResolver],
    }).compile();

    resolver = module.get<CountryFlagsResolver>(CountryFlagsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
