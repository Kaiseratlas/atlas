import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { State } from '../models/state.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Mod } from '../../mods/entities/mod.entity';

@Injectable()
export class StatesService {
  constructor(
    @InjectRepository(State)
    private statesRepository: Repository<State>,
  ) {}

  findById(stateId: State['stateId'], mod: Mod) {
    return this.statesRepository.findOneOrFail({ where: { stateId, mod } });
  }
}
