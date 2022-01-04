import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { State } from '../models';
import { InjectRepository } from '@nestjs/typeorm';
import { Mod } from '../../mods/models/mod.model';
import path from 'path';
import fg from 'fast-glob';
import { ParserService } from '../../parser/services/parser.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class StatesService {
  constructor(
    @InjectRepository(State)
    private statesRepository: Repository<State>,
    private parserService: ParserService,
  ) {}

  findAll(mod: Mod) {
    return this.statesRepository.find({ where: { mod } });
  }

  findById(stateId: State['stateId'], mod: Mod) {
    return this.statesRepository.findOneOrFail({ where: { stateId, mod } });
  }

  async fetchAll(mod: Mod): Promise<State[]> {
    const statesPath = path.resolve(mod.path, 'history', 'states');
    const files = await fg('*.txt', {
      cwd: statesPath,
      absolute: true,
      objectMode: true,
    });

    return Promise.all(
      files.map(async ({ path }) => {
        const out = await this.parserService.parseFile(path);
        const state = plainToInstance(State, out['state'], {
          groups: ['parsing'],
        });
        //console.log('state', state);
        return { ...state, mod };
      }),
    );
  }

  async refresh(mod: Mod) {
    const states = await this.fetchAll(mod);
    console.log('states', states);
    await this.statesRepository.delete({ mod });
    await this.statesRepository.save(states);
  }
}
