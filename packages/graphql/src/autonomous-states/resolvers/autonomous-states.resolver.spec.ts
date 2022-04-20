import { Test, TestingModule } from '@nestjs/testing';
import { AutonomousStatesResolver } from './autonomous-states.resolver';

describe('AutonomousStatesResolver', () => {
  let resolver: AutonomousStatesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutonomousStatesResolver],
    }).compile();

    resolver = module.get<AutonomousStatesResolver>(AutonomousStatesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
