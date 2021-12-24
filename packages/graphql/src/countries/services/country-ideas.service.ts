import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CountryIdea } from '../models';
import { Repository } from 'typeorm';

@Injectable()
export class CountryIdeasService {
  constructor(
    @InjectRepository(CountryIdea)
    private countryIdeaRepository: Repository<CountryIdea>,
  ) {}

  serialize(ideaName: string): CountryIdea {
    return this.countryIdeaRepository.create({ ideaName });
  }

  parse(ideaName: string | string[]): CountryIdea[] {
    if (!ideaName) {
      return [];
    }

    if (!Array.isArray(ideaName)) {
      return [this.serialize(ideaName)];
    }

    return ideaName.map(this.serialize.bind(this));
  }
}
