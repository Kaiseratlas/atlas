import { Injectable } from '@nestjs/common';
import { Mod } from '../../mods/models/mod.model';
import fg from 'fast-glob';
import {
  convertToArray,
  ParserService,
} from '../../parser/services/parser.service';
import { Sprite } from '../models/sprite.model';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

@Injectable()
export class SpritesService {
  constructor(
    private parserService: ParserService,
    @InjectRepository(Sprite)
    private spritesRepository: Repository<Sprite>,
  ) {}

  async findAll(mod: Mod) {
    return this.spritesRepository.find({ mod });
  }

  async parseFile(filepath: string): Promise<Sprite[]> {
    try {
      const out = await this.parserService.parseFile(filepath);
      const spriteData = [
        ...convertToArray(out['spriteTypes']?.['SpriteType']),
        ...convertToArray(out['spriteTypes']?.['spriteType']),
      ];
      const sprites = plainToInstance(Sprite, spriteData, {
        groups: ['parsing'],
        // excludeExtraneousValues: true,
        // exposeUnsetFields: false,
      });
      return sprites;
    } catch (error) {
      return [];
    }
  }

  async fetchAll(mod: Mod) {
    const files = await fg('**/*.gfx', {
      cwd: mod.path,
      absolute: true,
      objectMode: true,
    });
    return (await Promise.all(files.map(({ path }) => this.parseFile(path))))
      .flat()
      .map((sprite) => ({ ...sprite, mod }));
  }

  async refresh(mod: Mod): Promise<void> {
    const sprites = await this.fetchAll(mod);
    //await this.spritesRepository.delete({});
    await this.spritesRepository.delete({ mod });
    await this.spritesRepository.save(sprites);
  }

  async refreshGfx(mod: Mod) {
    const sprites = await this.findAll(mod);
    const spritesPath = path.resolve('../client', 'gfx', 'sprites');

    if (!fs.existsSync(spritesPath)) {
      await fs.promises.mkdir(spritesPath, { recursive: true });
    }

    const sprites2 = await Promise.allSettled(
      sprites
        .filter((sprite) => !!sprite.textureFile)
        .filter((sprite) => !sprite.textureHash)
        .map(async (sprite) => {
          const textureFilePath = path.resolve(mod.path, sprite.textureFile);

          if (!fs.existsSync(textureFilePath)) {
            return { ...sprite, textureHash: null };
          }

          const textureFile = await fs.promises.readFile(textureFilePath);
          const hash = crypto
            .createHash('sha256')
            .update(textureFile)
            .digest('hex');
          const filePath = path.resolve(spritesPath, `${hash}.png`);
          await fs.promises.writeFile(filePath, textureFile);
          return { ...sprite, textureHash: hash };
        }),
    );

    await this.spritesRepository.delete({ mod });
    await this.spritesRepository.save(
      sprites2
        .filter((res) => res.status === 'fulfilled')
        .map((v) => v['value']),
    );
  }
}
