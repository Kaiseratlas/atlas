import { Injectable } from '@nestjs/common';
import { CountryLeader } from '../models';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mod } from '../../mods/models/mod.model';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import fg from 'fast-glob';

const GFX_LEADERS_PATH = path.resolve('../client', 'gfx', 'leaders');

@Injectable()
export class CountryLeadersService {
  constructor(
    @InjectRepository(CountryLeader)
    private countryLeadersRepository: Repository<CountryLeader>,
  ) {}

  async findAll(mod: Mod) {
    return this.countryLeadersRepository
      .createQueryBuilder('leader')
      .leftJoinAndSelect('leader.history', 'history')
      .leftJoin('history.mod', 'mod')
      .where('mod.id = :modId', { modId: mod.id })
      .getMany();
  }

  async findByCountryTag(countryTag: string, mod: Mod): Promise<any[]> {
    const leaders = await this.countryLeadersRepository
      .createQueryBuilder('leader')
      .leftJoin('leader.history', 'history')
      .leftJoin('history.mod', 'mod')
      .where('UPPER(history.tag) = UPPER(:countryTag)', { countryTag })
      .andWhere('history.mod.id = :modId', { modId: mod.id })
      .getMany();
    //console.log('leaders', leaders);
    return leaders;
  }

  async copyPortrait(filepath: string) {
    const data = await fs.promises.readFile(filepath);
    const hash = crypto.createHash('sha256').update(data).digest('hex');
    const filename = path.resolve(GFX_LEADERS_PATH, `${hash}.png`);
    await fs.promises.writeFile(filename, data);
    return hash;
  }

  async refreshPortraits(mod: Mod) {
    const leaders = await this.findAll(mod);

    if (!fs.existsSync(GFX_LEADERS_PATH)) {
      await fs.promises.mkdir(GFX_LEADERS_PATH, { recursive: true });
    }

    return Promise.all(
      leaders
        .filter((leader) => !!leader.picture)
        .map(async (leader) => {
          const portraitsPath = path.resolve(mod.path, 'gfx', 'leaders');

          const [portraitPath] = await fg(`**/${leader.picture}`, {
            cwd: portraitsPath,
            absolute: true,
          });
          //
          // console.log('portraitPath', portraitPath)

          const isPictureExists =
            !!leader.picture && fs.existsSync(portraitPath);

          const pictureHash = isPictureExists
            ? await this.copyPortrait(portraitPath)
            : null;

          return this.countryLeadersRepository.save({
            ...leader,
            pictureHash,
          });
        }),
    );
  }
}
