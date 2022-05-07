import { Test, TestingModule } from '@nestjs/testing';
import { WarGoalsResolver } from './war-goals.resolver';

describe('WarGoalsResolver', () => {
  let resolver: WarGoalsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WarGoalsResolver],
    }).compile();

    resolver = module.get<WarGoalsResolver>(WarGoalsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
