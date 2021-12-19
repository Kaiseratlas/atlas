import { Injectable, OnModuleInit } from '@nestjs/common';
import { Mod } from '../../mods/entities/mod.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ideology } from '../entities/ideology.entity';
import { Jomini } from 'jomini';
import fs from 'fs';
import { resolve } from 'path';
import rgb2hex from 'rgb2hex';
import { IDEOLOGIES_KEY } from '../ideologies.consts';

@Injectable()
export class IdeologiesService implements OnModuleInit {
  private parser: Jomini;

  constructor(
    @InjectRepository(Ideology)
    private ideologiesRepository: Repository<Ideology>,
  ) {}

  async onModuleInit(): Promise<void> {
    this.parser = await Jomini.initialize();
  }

  async refresh(mod: Mod): Promise<Ideology[]> {
    const ideologiesPath = resolve(
      mod.path,
      'common',
      'ideologies',
      '00_ideologies.txt',
    );

    if (!fs.existsSync(ideologiesPath)) {
      return [];
    }

    const data = await fs.promises.readFile(ideologiesPath);
    const out = this.parser.parseText(data);

    await this.ideologiesRepository.delete({ mod });
    return this.ideologiesRepository.save(
      Object.entries(out[IDEOLOGIES_KEY]).map(([name, ideology]) => {
        const [subtype] = Object.keys(ideology['types']);
        console.log('ideology', ideology);
        return {
          name,
          color: rgb2hex(`rgb(${ideology['color'].join()})`).hex,
          description: `${subtype}_desc:0`,
          canCollaborate: ideology['can_collaborate'],
          canBeBoosted: ideology['can_be_boosted'],
          mod,
        };
      }),
    );
  }
}
