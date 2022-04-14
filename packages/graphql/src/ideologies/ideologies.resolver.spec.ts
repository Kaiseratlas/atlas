import { Test, TestingModule } from '@nestjs/testing';
import { IdeologiesResolver } from './ideologies.resolver';

describe('IdeologiesResolver', () => {
  let resolver: IdeologiesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IdeologiesResolver],
    }).compile();

    resolver = module.get<IdeologiesResolver>(IdeologiesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
