import { Injectable, OnModuleInit } from '@nestjs/common';
import path from 'path';
import { Jomini } from 'jomini';
import fs from 'fs';
import { ModsService } from '../../mods/services/mods.service';
import { Mod } from '../../mods/models/mod.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryTag } from '../models/country-tag.model';

@Injectable()
export class CountryTagsService implements OnModuleInit {
  private parser: Jomini;

  constructor(
    private modsService: ModsService,
    @InjectRepository(CountryTag)
    private countryTagsRepository: Repository<CountryTag>,
  ) {}

  async onModuleInit(): Promise<void> {
    this.parser = await Jomini.initialize();
  }

  async fetchTags(mod: Mod): Promise<string[]> {
    const data = await fs.promises.readFile(
      path.resolve(mod.path, 'common', 'country_tags', '00_countries.txt'),
    );
    const out = this.parser.parseText(data);
    return Object.keys(out);
  }

  async refreshTags(mod: Mod): Promise<void> {
    console.log('refreshing tags...');
    const tags = await this.fetchTags(mod);
    await this.countryTagsRepository.delete({ mod });
    await this.countryTagsRepository.insert(
      tags.map((tag) => ({
        tag,
        mod,
      })),
    );
  }
}
