import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryNavyLeader } from '../models';

@Injectable()
export class CountryNavyLeadersService {
  constructor(
    @InjectRepository(CountryNavyLeader)
    private countryNavyLeadersRepository: Repository<CountryNavyLeader>,
  ) {}

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
