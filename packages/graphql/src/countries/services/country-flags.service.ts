import { Injectable, OnModuleInit } from '@nestjs/common';
import { Jomini } from 'jomini';
import { Mod } from '../../mods/models/mod.model';
import fg from 'fast-glob';
import path from 'path';
import { PNG } from 'pngjs';
import TGA from 'tga';
import crypto from 'crypto';
import fs from 'fs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryFlag } from '../models/country-flag.model';

@Injectable()
export class CountryFlagsService implements OnModuleInit {
  constructor(
    @InjectRepository(CountryFlag)
    private countryFlagsRepository: Repository<CountryFlag>,
  ) {}

  private parser: Jomini;

  async onModuleInit(): Promise<void> {
    this.parser = await Jomini.initialize();
  }

  async convertToPng(flagPath: string): Promise<string> {
    const flagBuffer = await fs.promises.readFile(flagPath);

    const tga = new TGA(flagBuffer);

    const png = new PNG({ width: tga.width, height: tga.height });
    png.data = tga.pixels;
    const hash = crypto.createHash('sha256').update(flagBuffer).digest('hex');

    const flagsPath = path.resolve('../client', 'gfx', 'flags');

    if (!fs.existsSync(flagsPath)) {
      await fs.promises.mkdir(flagsPath, { recursive: true });
    }

    await new Promise((resolve) => {
      const stream = png
        .pack()
        .pipe(fs.createWriteStream(path.resolve(flagsPath, `${hash}.png`)));
      stream.on('finish', resolve);
    });

    return hash;
  }

  async refresh(mod: Mod): Promise<CountryFlag[]> {
    const flagsPath = path.resolve(mod.path, 'gfx', 'flags');
    const files = await fg('*.tga', {
      cwd: flagsPath,
      deep: 1,
      absolute: true,
      objectMode: true,
    });
    await this.countryFlagsRepository.delete({ mod });
    return this.countryFlagsRepository.save(
      await Promise.all(
        files.map(async ({ name, path }) => {
          const [, tag, variant] = name.match(/(\S{3})_?(.*?).tga/);
          return this.countryFlagsRepository.create({
            tag,
            variant: variant === '' ? null : variant,
            sha256: await this.convertToPng(path),
            mod,
          });
        }),
      ),
    );
  }
}
