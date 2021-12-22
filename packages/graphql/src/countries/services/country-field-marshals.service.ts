import { CountryMilitaryCommandersService } from './country-military-commanders.service';
import { Injectable } from '@nestjs/common';
import { CountryCorpsCommander, CountryFieldMarshal } from '../models';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mod } from '../../mods/models/mod.model';

@Injectable()
export class CountryFieldMarshalsService extends CountryMilitaryCommandersService {
  constructor(
    @InjectRepository(CountryFieldMarshal)
    private countryFieldMarshalsRepository: Repository<CountryFieldMarshal>,
  ) {
    super();
  }

  async updateById(id, data) {
    return this.countryFieldMarshalsRepository.save({ id, ...data });
  }

  async findAll(mod: Mod): Promise<CountryFieldMarshal[]> {
    return this.countryFieldMarshalsRepository
      .createQueryBuilder('field_marshal')
      .leftJoinAndSelect('field_marshal.history', 'history')
      .leftJoin('history.mod', 'mod')
      .where('mod.id = :modId', { modId: mod.id })
      .getMany();
  }

  private serialize(out: unknown): CountryFieldMarshal {
    return this.countryFieldMarshalsRepository.create({
      name: out['name'],
      portraitPath: out['portrait_path'],
      skill: out['skill'],
      attackSkill: out['attack_skill'],
      defenseSkill: out['defense_skill'],
      logisticsSkill: out['logistics_skill'],
      planningSkill: out['planning_skill'],
    });
  }

  parse(out: any): CountryCorpsCommander[] {
    if (!out) {
      return [];
    }

    if (!Array.isArray(out)) {
      return [this.serialize(out)];
    }

    return out.map(this.serialize.bind(this));
  }
}
