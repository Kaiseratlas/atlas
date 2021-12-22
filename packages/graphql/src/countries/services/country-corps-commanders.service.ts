import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryCorpsCommander } from '../models';

@Injectable()
export class CountryCorpsCommandersService {
  constructor(
    @InjectRepository(CountryCorpsCommander)
    private countryCorpsCommandersRepository: Repository<CountryCorpsCommander>,
  ) {}

  private serialize(out: unknown): CountryCorpsCommander {
    return this.countryCorpsCommandersRepository.create({
      commanderId: out['id'],
      name: out['name'],
      description: out['desc'],
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
