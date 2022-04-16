import { Test, TestingModule } from '@nestjs/testing';
import { BuildingsResolver } from './buildings.resolver';

describe('BuildingsResolver', () => {
  let resolver: BuildingsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuildingsResolver],
    }).compile();

    resolver = module.get<BuildingsResolver>(BuildingsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
