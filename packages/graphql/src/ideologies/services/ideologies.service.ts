import { Injectable } from '@nestjs/common';
import { Mod } from '../../mods/entities/mod.entity';
import { Ideology } from '../models/ideology.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class IdeologiesService {
  constructor(
    @InjectRepository(Ideology)
    private ideologiesRepository: Repository<Ideology>,
  ) {}

  async find(mod: Mod): Promise<Ideology[]> {
    return this.ideologiesRepository.find({ where: { mod } });
  }
}
