import { Test, TestingModule } from '@nestjs/testing';
import { IdeologiesService } from './ideologies.service';

describe('IdeologiesService', () => {
  let service: IdeologiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IdeologiesService],
    }).compile();

    service = module.get<IdeologiesService>(IdeologiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
