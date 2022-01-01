import { Injectable, OnModuleInit } from '@nestjs/common';
import { Mod } from '../../mods/models/mod.model';
import fg from 'fast-glob';
import path from 'path';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClass, plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Event, EventTitle, EventDescription, EventOption } from '../models';

@Injectable()
export class EventsService implements OnModuleInit {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
    @InjectRepository(EventTitle)
    private readonly eventTitlesRepository: Repository<EventTitle>,
    @InjectRepository(EventDescription)
    private readonly eventDescriptionsRepository: Repository<EventDescription>,
    @InjectRepository(EventOption)
    private readonly eventOptionRepository: Repository<EventOption>,
  ) {}

  private parser: Jomini;

  findById(eventId: Event['eventId'], mod: Mod): Promise<Event> {
    return this.eventsRepository.findOneOrFail({
      where: {
        eventId,
        mod,
      },
    });
  }

  findAll(mod: Mod): Promise<Event[]> {
    return this.eventsRepository.find({ where: { mod } });
  }

  async onModuleInit(): Promise<void> {
    this.parser = await Jomini.initialize();
  }

  private serializeOption(out: unknown): EventOption[] {
    if (!out) {
      return [];
    }

    if (!Array.isArray(out)) {
      return [plainToInstance(EventOption, out, { groups: ['parsing'] })];
    }

    return out.map((o) =>
      plainToInstance(EventOption, o, { groups: ['parsing'] }),
    );
  }

  private serializeText(
    out: unknown,
    key: string,
    event: Event,
  ): EventDescription[] | EventTitle[] {
    if (!out) {
      return [];
    }

    switch (typeof out) {
      case 'string': {
        return [
          this[
            key === 'title'
              ? 'eventTitlesRepository'
              : 'eventDescriptionsRepository'
          ].create({ text: out }),
        ];
      }

      default: {
        if (!Array.isArray(out)) {
          return [
            this[
              key === 'title'
                ? 'eventTitlesRepository'
                : 'eventDescriptionsRepository'
            ].create({ text: out[key] }),
          ];
        }

        return out.map((o) =>
          this[
            key === 'title'
              ? 'eventTitlesRepository'
              : 'eventDescriptionsRepository'
          ].create({ text: o[key] }),
        );
      }
    }
  }

  private serialize(out: unknown): Event {
    if (!!out['desc'] && typeof out['desc'] !== 'string') {
      console.log('out', out);
    }
    const event = plainToClass(Event, out, { groups: ['parsing'] });
    const titles = this.serializeText(out['title'], 'title', event);
    const descriptions = this.serializeText(out['desc'], 'desc', event);
    const options = this.serializeOption(out['option']);

    return this.eventsRepository.create({
      ...event,
      titles,
      descriptions,
      options,
    });
  }

  async parseFile(filepath: string): Promise<Event[]> {
    const data = await fs.promises.readFile(filepath);

    try {
      const out = this.parser.parseText(data);
      return [
        Event.Type.COUNTRY_EVENT,
        Event.Type.NEWS_EVENT,
        Event.Type.STATE_EVENT,
        Event.Type.UNIT_LEADER_EVENT,
        Event.Type.OPERATIVE_LEADER_EVENT,
      ].flatMap((type) => {
        if (!out[type]) {
          return [];
        }

        if (!Array.isArray(out[type])) {
          const event = this.serialize(out[type]);
          return [
            this.eventsRepository.create({
              ...event,
              type: Event.Type.COUNTRY_EVENT,
            }),
          ];
        }

        return out[type].map(this.serialize.bind(this)).map((event) => {
          return { ...event, type };
        });
      });
    } catch (e) {
      // invalid syntax encountered: hidden object must start with a key
      // TODO: fix error
      console.log(e, filepath);
      return [];
    }
  }

  async fetchAll(mod: Mod): Promise<Event[]> {
    const eventsPath = path.resolve(mod.path, 'events');
    const files = await fg('**/*.txt', {
      cwd: eventsPath,
      absolute: true,
      objectMode: true,
    });
    return (await Promise.all(files.map(({ path }) => this.parseFile(path))))
      .flat(1)
      .map((event) => ({ ...event, mod }));
  }

  async refresh(mod: Mod) {
    const events = await this.fetchAll(mod);
    //console.log('events', events);
    await this.eventsRepository.delete({});
    await this.eventsRepository.delete({ mod });
    await this.eventsRepository.save(events);
  }
}
