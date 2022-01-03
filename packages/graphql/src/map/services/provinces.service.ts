import { Injectable, OnModuleInit } from '@nestjs/common';
import { parse, Parser as CsvParser } from 'csv-parse';
import { Mod } from '../../mods/models/mod.model';
import fs from 'fs';
import path from 'path';
import { Repository } from 'typeorm';
import { Province } from '../models';
import { InjectRepository } from '@nestjs/typeorm';
import type { ProvinceType } from '../enums/province-type.enum';

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

@Injectable()
export class ProvincesService implements OnModuleInit {
  private csvParser: CsvParser;

  constructor(
    @InjectRepository(Province)
    private provincesRepository: Repository<Province>,
  ) {}

  onModuleInit(): void {
    this.csvParser = parse({
      delimiter: ';',
      autoParse: true,
    });
  }

  async fetchAll(mod: Mod) {
    const definitionPath = path.resolve(mod.path, 'map', 'definition.csv');
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
