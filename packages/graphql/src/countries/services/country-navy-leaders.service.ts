import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryNavyLeader } from '../models';
import { Mod } from '../../mods/models/mod.model';
import { CountryMilitaryCommandersService } from './country-military-commanders.service';

@Injectable()
export class CountryNavyLeadersService extends CountryMilitaryCommandersService {
  constructor(
    @InjectRepository(CountryNavyLeader)
    private countryNavyLeadersRepository: Repository<CountryNavyLeader>,
  ) {
    super();
  }

  async updateById(id, data) {
    return this.countryNavyLeadersRepository.save({ id, ...data });
  }

  async findAll(mod: Mod): Promise<CountryNavyLeader[]> {
    return this.countryNavyLeadersRepository
      .createQueryBuilder('navy_leader')
      .leftJoinAndSelect('navy_leader.history', 'history')
      .leftJoin('history.mod', 'mod')
      .where('mod.id = :modId', { modId: mod.id })
      .getMany();
  }

  private serialize(out: unknown): CountryNavyLeader {
    return this.countryNavyLeadersRepository.create({
      commanderId: out['id'],
      name: out['name'],
      description: out['desc'],
      portraitPath: out['portrait_path'],
      skill: out['skill'],
      attackSkill: out['attack_skill'],
      defenseSkill: out['defense_skill'],
      maneuveringSkill: out['logistics_skill'],
      coordinationSkill: out['planning_skill'],
    });
  }

  parse(out: any): CountryNavyLeader[] {
    if (!out) {
      return [];
    }

    if (!Array.isArray(out)) {
      return [this.serialize(out)];
    }

    return out.map(this.serialize.bind(this));
  }
}
