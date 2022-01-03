import { Repository } from 'typeorm';
import { Continent } from '../models';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Mod } from '../../mods/models/mod.model';
import fg from 'fast-glob';
import path from 'path';
import {
  convertToArray,
  ParserService,
} from '../../parser/services/parser.service';

@Injectable()
export class ContinentsService {
  constructor(
    @InjectRepository(Continent)
    private continentsRepository: Repository<Continent>,
    private parserService: ParserService,
  ) {}

  async fetchAll(mod: Mod): Promise<any[]> {
    const mapPath = path.resolve(mod.path, 'map');
    const files = await fg('**/continent.txt', {
      cwd: mapPath,
      absolute: true,
      objectMode: true,
    });
    return (
      await Promise.all(
        files.map(async ({ path }) => {
          const data = await this.parserService.parseFile(path);
          return convertToArray(data['continents']);
        }),
      )
    )
      .flat()
      .map((name: string, i: number) =>
        this.continentsRepository.create({ name, continentId: i + 1, mod }),
      );
  }

  async refresh(mod: Mod) {
    const continents = await this.fetchAll(mod);
    await this.continentsRepository.delete({ mod });
    await this.continentsRepository.save(continents);
  }
}
