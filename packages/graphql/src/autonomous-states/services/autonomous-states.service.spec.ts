import { Test, TestingModule } from '@nestjs/testing';
import { AutonomousStatesService } from './autonomous-states.service';

describe('AutonomousStatesService', () => {
  let service: AutonomousStatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AutonomousStatesService],
    }).compile();

    service = module.get<AutonomousStatesService>(AutonomousStatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
