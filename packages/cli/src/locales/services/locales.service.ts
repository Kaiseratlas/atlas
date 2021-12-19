import { Injectable } from '@nestjs/common';
import path from 'path';
import fg from 'fast-glob';
import fs from 'fs';
import { LocaleMap } from '../locales.types';
import { Mod } from '../../mods/entities/mod.entity';

@Injectable()
export class LocalesService {
  async fetch(mod: Mod) {
    const localeFiles = await fg(['**/*.yml'], {
      cwd: mod.path,
      absolute: true,
    });
    const localesMaps = await Promise.all(
      localeFiles.map((file) => this.parseFile(file)),
    );
    const filteredMaps = localesMaps.filter((localeMap) => !!localeMap);

    const combined: LocaleMap = new Map();

    filteredMaps.forEach((localeMap) => {
      for (const [language, locales] of localeMap) {
        if (!combined.has(language)) {
          combined.set(language, new Map());
        }

        for (const item of locales) {
          const map = combined.get(language);
          map.set(...item);
        }
      }
    });

    return combined;
  }

  async generate(mod: Mod): Promise<void> {
    const localeMap = await this.fetch(mod);
    await Promise.all(
      Array.from(localeMap).map(async ([lang, locales]) => {
        const localePath = path.resolve('../../graphql/src/i18n');
        const langFolder = `${lang}-${mod.version.replace(/\./g, '_')}`;
        const langFolderPath = path.resolve(localePath, langFolder);
        if (!fs.existsSync(langFolderPath)) {
          await fs.promises.mkdir(langFolderPath);
        }
        const filePath = path.resolve(langFolderPath, 'common.json');

        if (!fs.existsSync(filePath)) {
          const data = JSON.stringify(Object.fromEntries(locales));
          return fs.promises.writeFile(filePath, data);
        }

        const buffer = await fs.promises.readFile(filePath);
        const oldData = JSON.parse(buffer.toString());
        return fs.promises.writeFile(
          filePath,
          JSON.stringify({
            ...oldData,
            ...Object.fromEntries(locales),
          }),
        );
      }),
    );
  }

  async parseFile(path: string): Promise<LocaleMap | null> {
    const buffer = await fs.promises.readFile(path);
    const data = buffer.toString();

    if (!data) {
      return null;
    }

    return this.parse(buffer.toString());
  }

  parse(data: string): LocaleMap | null {
    const localeMap: LocaleMap = new Map();

    const lines = data.match(/l_(\S+):([\n|\r])|(\S+):(\d+)?(\s+)?"(.*)"/g);

    if (!lines) {
      return null;
    }

    let currentLanguage: string;

    lines.forEach((line) => {
      const parsed = line.match(/^l_(\S+):/);

      if (parsed) {
        const [, language] = parsed;
        currentLanguage = language;
        return;
      }

      if (!localeMap.has(currentLanguage)) {
        localeMap.set(currentLanguage, new Map());
      }

      const dictionary = localeMap.get(currentLanguage);
      const [, key, , , value] = line.match(/(\S+):(\d+)?(\s+)?"(.*)"/);
      dictionary.set(key, value);
    });

    return localeMap;
  }
}
