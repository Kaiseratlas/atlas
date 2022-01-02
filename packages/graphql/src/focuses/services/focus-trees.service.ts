import { Injectable } from '@nestjs/common';
import {
  convertToArray,
  ParserService,
} from '../../parser/services/parser.service';
import { Mod } from '../../mods/models/mod.model';
import path from 'path';
import fg from 'fast-glob';
import { plainToInstance } from 'class-transformer';
import { FocusTree } from '../models/focus-tree.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FocusTreesService {
  constructor(
    private parserService: ParserService,
    @InjectRepository(FocusTree)
    private readonly focusTreesRepository: Repository<FocusTree>,
  ) {}

  async findById(treeId: FocusTree['treeId'], mod: Mod) {
    return this.focusTreesRepository.findOneOrFail({ where: { treeId, mod } });
  }

  async findAll(mod: Mod) {
    return this.focusTreesRepository.find({ where: { mod } });
  }

  async fetchAll(mod: Mod): Promise<FocusTree[]> {
    const focusesPath = path.resolve(mod.path, 'common', 'national_focus');
    const files = await fg('**/*.txt', {
      cwd: focusesPath,
      objectMode: true,
      absolute: true,
    });
    const focuses = await Promise.allSettled(
      files.map(({ path }) => this.parserService.parseFile(path)),
    );
    const focusTrees: FocusTree[] = focuses
      .filter((r) => r.status === 'fulfilled')
      .map((r) => r['value'])
      .map((out) => convertToArray(out['focus_tree']))
      .map<FocusTree[]>((out) =>
        plainToInstance(FocusTree, out, { groups: ['parsing'] }),
      )
      .flat()
      .map((focus) => ({ ...focus, mod }));
    return focusTrees;
  }

  async refresh(mod: Mod) {
    const focusTrees = await this.fetchAll(mod);
    await this.focusTreesRepository.delete({ mod });
    await this.focusTreesRepository.save(focusTrees);
  }
}
