import { Injectable } from '@nestjs/common';
import { parse, Parser as CsvParser } from 'csv-parse';
import { Mod } from '../../mods/models/mod.model';
import fs from 'fs';
import path from 'path';
import { Repository } from 'typeorm';
import { Province } from '../models';
import { InjectRepository } from '@nestjs/typeorm';
import type { ProvinceType } from '../enums/province-type.enum';
import { SvgService } from './svg.service';
import { INode } from 'svgson';
import rgb2hex from 'rgb2hex';

type ProvinceCsvRecord = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

type ProvinceMap = Map<Province['provinceId'], Province>;

function parseNodeStyle(node: INode): Record<string, string> {
  const style = node.attributes?.['style'] ?? '';
  const entries = style.split(';').map((prop) => {
    const [name, value] = prop.split(':');
    return [name, value];
  });
  return Object.fromEntries(entries);
}

@Injectable()
export class ProvincesService {
  private readonly csvParser: CsvParser;

  constructor(
    @InjectRepository(Province)
    private provincesRepository: Repository<Province>,
    private svgService: SvgService,
  ) {
    this.csvParser = parse({
      delimiter: ';',
      autoParse: true,
    });
  }

  async findAll(mod: Mod): Promise<Province[]> {
    return this.provincesRepository.find({ where: { mod } });
  }

  async findAllAsMap(mod: Mod): Promise<ProvinceMap> {
    const provinces = await this.findAll(mod);
    return new Map(
      provinces.map((province) => [province.provinceId, province]),
    );
  }

  async fetchSvgMap(mod: Mod) {
    const mapPath = path.resolve(mod.path, 'map', 'provinces.svg');
    const svg = await this.svgService.readSvgFile(mapPath);
    const map = new Map<string, INode>();
    for (const node of svg.children) {
      // fill:#3910f4; stroke:none;
      const style = parseNodeStyle(node);
      const colorHex = style['fill'];
      const n = map.get(colorHex);

      if (!n) {
        map.set(colorHex, node);
      } else {
        node.attributes['d'] = n.attributes['d'] + ' ' + node.attributes['d'];
        map.set(colorHex, node);
      }
    }

    return map;
  }

  async fetchAll(mod: Mod) {
    const definitionPath = path.resolve(mod.path, 'map', 'definition.csv');
    const svgMap = await this.fetchSvgMap(mod);
    const parser = await fs
      .createReadStream(definitionPath)
      .pipe(this.csvParser);
    const provinces = [];
    for await (const record of parser) {
      const [
        provinceId,
        red,
        green,
        blue,
        type,
        coastal,
        terrain,
        continentId,
      ]: ProvinceCsvRecord = record;
      const province = this.provincesRepository.create({
        provinceId: Number(provinceId),
        red: Number(red),
        green: Number(green),
        blue: Number(blue),
        type: type as ProvinceType,
        coastal: coastal === 'true',
        terrain,
        continentId: Number(continentId),
        path:
          svgMap.get(rgb2hex(`rgb(${[red, green, blue].join()})`).hex)
            ?.attributes['d'] ?? null,
        mod,
      });

      provinces.push(province);
    }

    return provinces;
  }

  async refresh(mod: Mod) {
    const provinces = await this.fetchAll(mod);
    // console.log('provinces', provinces);
    await this.provincesRepository.delete({ mod });
    await this.provincesRepository.save(provinces);
  }
}
