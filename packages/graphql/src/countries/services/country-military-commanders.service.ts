import { Mod } from '../../mods/models/mod.model';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { CountryMilitaryCommander } from '../models/country-military-commander.model';
import { DeepPartial } from 'typeorm';

const GFX_LEADERS_PATH = path.resolve('../client', 'gfx', 'leaders');

export abstract class CountryMilitaryCommandersService {
  abstract findAll(mod: Mod): Promise<CountryMilitaryCommander[]>;

  abstract updateById(
    id: CountryMilitaryCommander['id'],
    data: DeepPartial<CountryMilitaryCommander>,
  ): Promise<CountryMilitaryCommander>;

  async copyPortrait(filepath: string) {
    const data = await fs.promises.readFile(filepath);
    const hash = crypto.createHash('sha256').update(data).digest('hex');
    const filename = path.resolve(GFX_LEADERS_PATH, `${hash}.png`);

    if (!fs.existsSync(filename)) {
      await fs.promises.writeFile(filename, data);
    }

    return hash;
  }

  async refreshPortraits(mod: Mod) {
    const commanders = await this.findAll(mod);

    if (!fs.existsSync(GFX_LEADERS_PATH)) {
      await fs.promises.mkdir(GFX_LEADERS_PATH, { recursive: true });
    }

    return Promise.all(
      commanders
        .filter((commander) => !!commander.portraitPath)
        .map(async (commander) => {
          const portraitPath = path.resolve(mod.path, commander.portraitPath);

          const pictureHash = fs.existsSync(portraitPath)
            ? await this.copyPortrait(portraitPath)
            : null;
          return this.updateById(commander.id, {
            pictureHash,
          });
        }),
    );
  }
}
