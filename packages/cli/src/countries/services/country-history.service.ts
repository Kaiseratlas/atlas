import { Injectable } from '@nestjs/common';
import { Jomini } from 'jomini';
import { ModsService } from '../../mods/services/mods.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryHistory } from '../entities/country-history.entity';
import { Mod } from '../../mods/entities/mod.entity';
import fg from 'fast-glob';
import fs from 'fs';
import path from 'path';

@Injectable()
export class CountryHistoryService {
  private parser: Jomini;

  constructor(
    private modsService: ModsService,
    @InjectRepository(CountryHistory)
    private countryHistoryRepository: Repository<CountryHistory>,
  ) {}

  async onModuleInit(): Promise<void> {
    this.parser = await Jomini.initialize();
  }

  async fetch(filepath: string, mod: Mod): Promise<CountryHistory> {
    const data = await fs.promises.readFile(filepath);
    const out = this.parser.parseText(data);
    console.log('out', out['add_ideas']);

    // TODO: why set_war_support could be an array?
    const warSupport = Array.isArray(out['set_war_support'])
      ? out['set_war_support'][0]
      : out['set_war_support'];

    return this.countryHistoryRepository.create({
      capitalId: out['capital'],
      researchSlots: out['set_research_slots'],
      stability: out['set_stability'],
      warSupport,
      politicalPower: out['add_political_power'],
      convoys: out['set_convoys'],
      mod,
    });
  }

  async refresh(mod: Mod): Promise<CountryHistory[]> {
    const countryHistoryPath = path.resolve(mod.path, 'history', 'countries');
    const files = await fg('*.txt', {
      cwd: countryHistoryPath,
      objectMode: true,
      absolute: true,
    });
    // console.log('files', files);
    await this.countryHistoryRepository.delete({ mod });
    return this.countryHistoryRepository.save(
      await Promise.all(files.map(({ path }) => this.fetch(path, mod))),
    );
  }
}
