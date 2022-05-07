import { Test, TestingModule } from '@nestjs/testing';
import { FocusesResolver } from './focuses.resolver';

describe('FocusesResolver', () => {
  let resolver: FocusesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FocusesResolver],
    }).compile();

    resolver = module.get<FocusesResolver>(FocusesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
