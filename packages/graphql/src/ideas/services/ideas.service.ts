import { Injectable } from '@nestjs/common';
import fg from 'fast-glob';
import { Mod } from '../../mods/models/mod.model';
import path from 'path';
import { Jomini } from 'jomini';
import fs from 'fs';
import { Idea } from '../models/idea.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import crypto from 'crypto';

const GFX_IDEAS_PATH = path.resolve('../client', 'gfx', 'ideas');

@Injectable()
export class IdeasService {
  private parser: Jomini;

  constructor(
    @InjectRepository(Idea)
    private ideasRepository: Repository<Idea>,
  ) {}

  async onModuleInit(): Promise<void> {
    this.parser = await Jomini.initialize();
  }

  async findByName(name: Idea['name'], mod: Mod): Promise<Idea> {
    return this.ideasRepository.findOne({ where: { name, mod } });
  }

  async find(mod: Mod) {
    return this.ideasRepository.find({ where: { mod } });
  }

  async copyPicture(picturePath: string): Promise<string> {
    const data = await fs.promises.readFile(picturePath);
    const hash = crypto.createHash('sha256').update(data).digest('hex');
    const filename = path.resolve(GFX_IDEAS_PATH, `${hash}.png`);
    if (!fs.existsSync(filename)) {
      await fs.promises.writeFile(filename, data);
    }
    return hash;
  }

  async refreshPictures(mod: Mod) {
    if (!fs.existsSync(GFX_IDEAS_PATH)) {
      await fs.promises.mkdir(GFX_IDEAS_PATH, { recursive: true });
    }

    const ideas = await this.find(mod);

    const updatedIdeas = await Promise.all(
      ideas.map(async ({ id: _, ...idea }, i) => {
        const picturePath = path.resolve(
          mod.path,
          'gfx',
          'interface',
          'ideas',
          `${idea.picture}.png`,
        );
        const isPictureExists = !!idea.picture && fs.existsSync(picturePath);
        //console.log('i', (ideas.length / i) * 100);
        const pictureHash = isPictureExists
          ? await this.copyPicture(picturePath)
          : null;
        //console.log('pictureHash', pictureHash);
        return {
          ...idea,
          pictureHash,
          mod,
        };
      }),
    );

    await this.ideasRepository.delete({ mod });
    return this.ideasRepository.save(updatedIdeas);
  }

  async parseFile(filepath: string, mod: Mod): Promise<Idea[]> {
    const data = await fs.promises.readFile(filepath);
    const out = this.parser.parseText(data);

    if (!out['ideas']) {
      return [];
    }

    const ff = path.basename(filepath);

    return Object.entries(out['ideas']).flatMap(([slot, slotData]) => {
      if (ff === '_Ministers_ideas.txt') {
        console.log('slot', slot);
        //console.log('slotData', slotData);
      }

      if (!Array.isArray(slotData)) {
        return Object.entries(slotData).map(([name, idea]) => {
          return this.ideasRepository.create({
            name,
            slot,
            picture: idea['picture'] ?? null,
            mod,
          });
        });
      }

      return slotData.flatMap((data) =>
        Object.entries(data).map(([name, idea]) => {
          return this.ideasRepository.create({
            name,
            slot,
            picture: idea['picture'] ?? null,
            mod,
          });
        }),
      );
    });
  }

  async fetch(mod: Mod): Promise<Idea[]> {
    const ideasPath = path.resolve(mod.path, 'common', 'ideas');
    const files = await fg('**/*.txt', {
      cwd: ideasPath,
      absolute: true,
      objectMode: true,
    });
    return (
      await Promise.all(files.map(({ path }) => this.parseFile(path, mod)))
    )
      .flat()
      .map((idea) => ({
        ...idea,
        mod,
      }));
  }

  async refresh(mod: Mod): Promise<void> {
    await this.ideasRepository.delete({ mod });
    const ideas = await this.fetch(mod);
    await this.ideasRepository.save(ideas);
  }
}
