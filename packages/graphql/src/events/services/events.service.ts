import { Injectable, OnModuleInit } from '@nestjs/common';
import { Mod } from '../../mods/models/mod.model';
import fg from 'fast-glob';
import path from 'path';
import fs from 'fs';
import { Jomini } from 'jomini';
import { plainToClass, plainToInstance } from 'class-transformer';
import { Event } from '../models/event.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EventText } from '../models/event-text.model';
import { EventOption } from '../models/event-option.model';

@Injectable()
export class EventsService implements OnModuleInit {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
    @InjectRepository(EventText)
    private readonly eventTextsRepository: Repository<EventText>,
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

  private serializeText(out: unknown): EventText[] {
    if (!out) {
      return [];
    }

    switch (typeof out) {
      case 'string': {
        return [this.eventTextsRepository.create({ text: out })];
      }

      default: {
        if (!Array.isArray(out)) {
          return [this.eventTextsRepository.create({ text: out['text'] })];
        }

        return out.map((o) =>
          this.eventTextsRepository.create({ text: o['text'] }),
        );
      }
    }
  }

  private serialize(out: unknown): Event {
    if (!!out['desc'] && typeof out['desc'] !== 'string') {
      console.log('out', out);
    }
    const titles = this.serializeText(out['title']);
    const descriptions = this.serializeText(out['desc']);
    const options = this.serializeOption(out['option']);

    const event = plainToClass(Event, out, { groups: ['parsing'] });

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
    console.log('events', events);
    await this.eventsRepository.delete({ mod });
    await this.eventsRepository.save(events);
  }
}
