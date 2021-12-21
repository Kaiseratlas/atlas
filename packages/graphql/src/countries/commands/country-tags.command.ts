import { CommandRunner, Option, Command } from 'nest-commander';
import { Mod } from '../../mods/models/mod.model';
import { CountryTagsService } from '../services';
import { ModsService } from '../../mods/services/mods.service';

interface CountryTagsCommandOptions
  extends Partial<Pick<Mod, 'remoteFileId' | 'version'>> {
  all?: boolean;
}

@Command({ name: 'country-tags' })
export class CountryTagsCommand implements CommandRunner {
  constructor(
    private countryTagsService: CountryTagsService,
    private modsService: ModsService,
  ) {}

  async run(
    passedParam: string[],
    options?: CountryTagsCommandOptions,
  ): Promise<void> {
    if (options?.all) {
      await this.runWithAll();
      return;
    }

    const mod = await this.modsService.findByRemoteId(
      options?.remoteFileId,
      options?.version,
    );

    await this.countryTagsService.refreshTags(mod);
  }

  async runWithAll() {}

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
