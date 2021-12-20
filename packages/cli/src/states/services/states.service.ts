import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Jomini } from 'jomini';
import { State } from '../entities/state.entity';
import { Mod } from '../../mods/entities/mod.entity';
import path from 'path';
import fg from 'fast-glob';
import fs from 'fs';

@Injectable()
export class StatesService implements OnModuleInit {
  constructor(
    @InjectRepository(State)
    private stateRepository: Repository<State>,
  ) {}

  private parser: Jomini;

  async onModuleInit(): Promise<void> {
    this.parser = await Jomini.initialize();
  }

  async refresh(mod: Mod): Promise<State[]> {
    const statesPath = path.resolve(mod.path, 'history', 'states');
    const files = await fg('*.txt', {
      cwd: statesPath,
      deep: 1,
      absolute: true,
      objectMode: true,
    });
    await this.stateRepository.delete({ mod });
    return this.stateRepository.save(
      await Promise.all(
        files.map(async ({ name, path }) => {
          // const [stateId] = name.match(/(\d+)\s?-\s?(.*).txt/);
          const data = await fs.promises.readFile(path);
          const out = this.parser.parseText(data);
          console.log("out['id']", out);
          return this.stateRepository.create({
            name: out['state']['name'],
            stateId: out['state']['id'],
            manpower: out['state']['manpower'],
            mod,
          });
        }),
      ),
    );
  }
}
