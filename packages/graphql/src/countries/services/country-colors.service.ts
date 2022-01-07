import { Injectable } from '@nestjs/common';
import { ILike, Not, Repository } from 'typeorm';
import { CountryColor } from '../models';
import { InjectRepository } from '@nestjs/typeorm';
import { Mod } from '../../mods/models/mod.model';
import path from 'path';
import fg from 'fast-glob';
import { ParserService } from '../../parser/services/parser.service';
import rgb2hex from 'rgb2hex';

@Injectable()
export class CountryColorsService {
  constructor(
    @InjectRepository(CountryColor)
    private countryColorsRepository: Repository<CountryColor>,
    private readonly parserService: ParserService,
  ) {}

  async findByTag(tag: string, mod: Mod) {
    console.log('tag', tag);
    const countryColor = await this.countryColorsRepository.findOneOrFail({
      where: {
        tag: ILike(tag),
        //ui: Not(null),
        mod,
      },
      loadEagerRelations: false,
    });
    console.log('countryColor', countryColor);
    return rgb2hex(
      `rgb(${[
        countryColor.red,
        countryColor.green,
        countryColor.blue,
      ].join()})`,
    ).hex;
  }

  async findUiByTag(tag: string, mod: Mod) {
    const countryColor = await this.countryColorsRepository.findOneOrFail({
      where: {
        tag,
        ui: null,
      },
    });
    return rgb2hex(
      `rgb(${[
        countryColor.red,
        countryColor.green,
        countryColor.blue,
      ].join()})`,
    ).hex;
  }

  async refresh(mod: Mod) {
    const countriesPath = path.resolve(mod.path, 'common', 'countries');
    const files = await fg(['./colors.txt', './cosmetic.txt'], {
      cwd: countriesPath,
      absolute: true,
      objectMode: true,
    });
    // console.log('files', files);
    const countryColors = (
      await Promise.all(
        files.map(async ({ path }) => {
          const out = await this.parserService.parseFile(path);
          //console.log('out', out);
          const countryColors = Object.entries(out).map(([tag, data]) =>
            this.countryColorsRepository.create({
              red: data['color']['rgb'][0],
              green: data['color']['rgb'][1],
              blue: data['color']['rgb'][2],
              tag,
              mod,
              ui: this.countryColorsRepository.create({
                red: data['color_ui']['rgb'][0],
                green: data['color_ui']['rgb'][1],
                blue: data['color_ui']['rgb'][2],
                tag,
                mod,
              }),
            }),
          );
          // console.log('countryColors', countryColors)
          return countryColors;
        }),
      )
    ).flat();

    await this.countryColorsRepository.delete({ mod });
    await this.countryColorsRepository.save(countryColors);
  }
}
