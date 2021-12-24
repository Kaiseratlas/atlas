import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CountryEvent } from '../models';
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CountryEventsService {
  constructor(
    @InjectRepository(CountryEvent)
    private countryEventRepository: Repository<CountryEvent>,
  ) {}

  private serialize(out: unknown): CountryEvent {
    return plainToClass(CountryEvent, out, { groups: ['parsing'] });
  }

  parse(out: unknown | unknown[]): CountryEvent[] {
    if (!out) {
      return [];
    }

    if (!Array.isArray(out)) {
      return [this.serialize(out)];
    }

    return out.map(this.serialize.bind(this));
  }
}
