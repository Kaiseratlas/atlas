import { Injectable, OnModuleInit } from '@nestjs/common';
import { Mod } from '../../mods/models/mod.model';
import { Ideology } from '../models/ideology.model';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Jomini } from 'jomini';
import { resolve } from 'path';
import fs from 'fs';
//import { IDEOLOGIES_KEY } from '../ideologies.consts';
import rgb2hex from 'rgb2hex';

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

  async fetch(mod: Mod): Promise<Ideology[]> {
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

    return Object.entries(out['ideologies']).map(([name, ideology]) => {
      return this.ideologiesRepository.create({
        name,
        color: rgb2hex(`rgb(${ideology['color'].join()})`).hex,
        canCollaborate: ideology['can_collaborate'],
        canBeBoosted: ideology['can_be_boosted'],
        mod,
      });
    });
  }

  async refresh(mod: Mod): Promise<Ideology[]> {
    await this.ideologiesRepository.delete({ mod });
    const ideologies = await this.fetch(mod);
    return this.ideologiesRepository.save(ideologies);
  }

  async find(mod: Mod): Promise<Ideology[]> {
    return this.ideologiesRepository.find({ where: { mod } });
  }

  async findByName(name: Ideology['name'], mod: Mod): Promise<Ideology> {
    return this.ideologiesRepository.findOneOrFail({
      where: { name: ILike(name), mod },
    });
  }
}
