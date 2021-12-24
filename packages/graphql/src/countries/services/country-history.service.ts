import { Injectable } from '@nestjs/common';
import { Jomini } from 'jomini';
import { ModsService } from '../../mods/services/mods.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryHistory } from '../models/country-history.model';
import { Mod } from '../../mods/models/mod.model';
import fg from 'fast-glob';
import fs from 'fs';
import path from 'path';
import { CountryPolitics } from '../models/country-politics.model';
import { CountryLeader, CountryPopularity } from '../models';
import { CountryCorpsCommandersService } from './country-corps-commanders.service';
import { CountryNavyLeadersService } from './country-navy-leaders.service';
import { CountryFieldMarshalsService } from './country-field-marshals.service';
import { CountryIdeasService } from './country-ideas.service';
import { CountryEventsService } from './country-events.service';

@Injectable()
export class CountryHistoryService {
  private parser: Jomini;

  constructor(
    private modsService: ModsService,
    @InjectRepository(CountryHistory)
    private countryHistoryRepository: Repository<CountryHistory>,
    @InjectRepository(CountryPolitics)
    private countryPoliticsRepository: Repository<CountryPolitics>,
    @InjectRepository(CountryLeader)
    private countryLeadersRepository: Repository<CountryLeader>,
    @InjectRepository(CountryPopularity)
    private countryPopularitiesRepository: Repository<CountryPopularity>,

    private countryFieldMarshalsService: CountryFieldMarshalsService,
    private countryCorpsCommanderService: CountryCorpsCommandersService,
    private countryNavyLeadersService: CountryNavyLeadersService,

    private countryIdeasService: CountryIdeasService,
    private countryEventsService: CountryEventsService,
  ) {}

  async findAll(mod: Mod) {
    return this.countryHistoryRepository.find({ where: { mod } });
  }

  async onModuleInit(): Promise<void> {
    this.parser = await Jomini.initialize();
  }

  async fetch(filepath: string, mod: Mod): Promise<CountryHistory> {
    const data = await fs.promises.readFile(filepath);
    const out = this.parser.parseText(data);
    //console.log('out', out['add_ideas']);

    const [, tag] = path.basename(filepath).match(/(\S{3}) - (.*).txt/);

    // TODO: why set_research_slots and set_war_support could be an array?
    const researchSlots = Array.isArray(out['set_research_slots'])
      ? out['set_research_slots'][0]
      : out['set_research_slots'];

    const warSupport = Array.isArray(out['set_war_support'])
      ? out['set_war_support'][0]
      : out['set_war_support'];

    if (!out['set_politics']) {
      return null;
    }

    if (out['set_politics']['elections_allowed'] === undefined) {
      console.log(out['set_politics']);
    }

    const politics = this.countryPoliticsRepository.create({
      electionFrequency: out['set_politics']['election_frequency'],
      electionsAllowed: out['set_politics']['elections_allowed'],
      lastElection: out['set_politics']['last_election'],
      ideologyName: out['set_politics']['ruling_party'],
    });

    if (
      out['create_country_leader'] &&
      !Array.isArray(out['create_country_leader'])
    ) {
      out['create_country_leader'] = [out['create_country_leader']];
    }

    const leaders = !out['create_country_leader']
      ? []
      : out['create_country_leader'].map((leader) => {
          const [, ideologyName = null] =
            leader['ideology']?.match(/(.*)_subtype/) ?? [];
          const picture = leader['picture']
            ? path.basename(leader['picture'])
            : null;
          return this.countryLeadersRepository.create({
            name: leader['name'],
            picture,
            description: leader['desc'],
            expire: new Date(leader['expire']),
            ideologyName,
          });
        });

    const popularities = Object.entries(out['set_popularities']).map(
      ([ideologyName, value]) =>
        this.countryPopularitiesRepository.create({
          ideologyName,
          value: value as number,
        }),
    );

    const fieldMarshals = this.countryFieldMarshalsService.parse(
      out['create_field_marshal'],
    );
    const corpsCommanders = this.countryCorpsCommanderService.parse(
      out['create_corps_commander'],
    );
    const navyLeaders = this.countryNavyLeadersService.parse(
      out['create_navy_leader'],
    );
    const ideas = this.countryIdeasService.parse(out['add_ideas']);
    const events = this.countryEventsService.parse(out['country_event']);

    return this.countryHistoryRepository.create({
      tag,
      capitalId: out['capital'],
      researchSlots,
      stability: out['set_stability'],
      warSupport,
      politicalPower: out['add_political_power'],
      convoys: out['set_convoys'],
      mod,
      politics,
      leaders,
      popularities,
      fieldMarshals,
      corpsCommanders,
      navyLeaders,
      ideas,
      events,
    });
  }

  async refresh(mod: Mod): Promise<CountryHistory[]> {
    const countryHistoryPath = path.resolve(mod.path, 'history', 'countries');
    const files = await fg('*.txt', {
      cwd: countryHistoryPath,
      objectMode: true,
      absolute: true,
    });
    // console.log('files', files);
    await this.countryHistoryRepository.delete({ mod });
    return this.countryHistoryRepository.save(
      (
        await Promise.all(files.map(({ path }) => this.fetch(path, mod)))
      ).filter((h) => !!h),
    );
  }
}
