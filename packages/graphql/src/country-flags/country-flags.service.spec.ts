import { Test, TestingModule } from '@nestjs/testing';
import { CountryFlagsService } from './country-flags.service';

describe('CountryFlagsService', () => {
  let service: CountryFlagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CountryFlagsService],
    }).compile();

    service = module.get<CountryFlagsService>(CountryFlagsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
