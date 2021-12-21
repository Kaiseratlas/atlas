import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Not, Repository } from 'typeorm';
import { CountryTag } from '../models/country-tag.model';
import { Mod } from '../../mods/models/mod.model';
import { CountryFlag } from '../models/country-flag.model';
import { CountryHistory } from '../models/country-history.model';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(CountryFlag)
    private countryFlagRepository: Repository<CountryFlag>,
    @InjectRepository(CountryTag)
    private countryTagsRepository: Repository<CountryTag>,
    @InjectRepository(CountryHistory)
    private countryHistoryRepository: Repository<CountryHistory>,
  ) {}

  async fetchHistory(
    countryTag: CountryTag['tag'],
    mod: Mod,
  ): Promise<CountryHistory> {
    return this.countryHistoryRepository.findOneOrFail({
      where: { tag: ILike(countryTag), mod },
    });
  }

  async fetchFlags(mod: Mod): Promise<CountryFlag[]> {
    return this.countryFlagRepository.find({ where: { mod } });
  }

  async fetchFlagsByTag(
    tag: CountryTag['tag'],
    mod: Mod,
  ): Promise<CountryFlag[]> {
    return this.countryFlagRepository.find({ where: { tag: ILike(tag), mod } });
  }

  async fetchTags(mod: Mod): Promise<CountryTag[]> {
    return this.countryTagsRepository.find({
      where: { mod, tag: Not(In(['XXA', 'XXB'])) },
    });
  }
}
