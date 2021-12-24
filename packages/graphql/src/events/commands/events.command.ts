import { CommandRunner, Option, Command } from 'nest-commander';
import { Mod } from '../../mods/models/mod.model';
import { ModsService } from '../../mods/services/mods.service';
import { EventsService } from '../services/events.service';

interface CountryFlagsCommandOptions
  extends Partial<Pick<Mod, 'remoteFileId' | 'version'>> {
  all?: boolean;
}

@Command({ name: 'events' })
export class EventsCommand implements CommandRunner {
  constructor(
    private eventsService: EventsService,
    private modsService: ModsService,
  ) {}

  async run(
    passedParam: string[],
    options?: CountryFlagsCommandOptions,
  ): Promise<void> {
    if (options?.all) {
      await this.runWithAll();
      return;
    }

    const mod = await this.modsService.findByRemoteId(
      options?.remoteFileId,
      options?.version,
    );

    await this.eventsService.refresh(mod);
  }

  async runWithAll(): Promise<void> {
    const mods = await this.modsService.findAll();
    await Promise.all(mods.map((mod) => this.eventsService.refresh(mod)));
  }

  @Option({
    flags: '-r, --remote-file-id [remoteFileId]',
    description: 'Remote file id',
  })
  parseRemoteFileId(val: string) {
    return val;
  }

  @Option({
    flags: '-v, --version [version]',
    description: 'Mod version',
  })
  parseVersion(val: string) {
    return val;
  }

  @Option({
    flags: '-a, --all',
    description: '',
  })
  parseAll() {
    return true;
  }
}
