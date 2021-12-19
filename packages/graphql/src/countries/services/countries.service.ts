import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CountryTag } from '../entities/country-tag.entity';
import { Mod } from '../../mods/entities/mod.entity';
import { CountryFlag } from '../entities/country-flag.entity';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(CountryFlag)
    private countryFlagRepository: Repository<CountryFlag>,
    @InjectRepository(CountryTag)
    private countryTagsRepository: Repository<CountryTag>,
  ) {}

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
    return this.countryTagsRepository.find({ where: { mod } });
  }

  // async fetchHistory(countyTag: string, countryName: string) {
  //   const modPath = path.resolve('mod/0.19.2/1521695605_kaiserreich');
  //   const filename = `${countyTag} - ${countryName}.txt`;
  //   const parser = await Jomini.initialize();
  //   const data = await fs.promises.readFile(
  //     path.resolve(modPath, 'history', 'countries', filename),
  //   );
  //   const out = parser.parseText(data);
  //   console.log('out', out);
  // }
}
