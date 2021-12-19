import { CommandRunner, Option, SubCommand } from 'nest-commander';
import { Mod } from '../../mods/entities/mod.entity';
import { CountryTagsService } from '../services/country-tags.service';
import { ModsService } from '../../mods/services/mods.service';

interface CountryTagsRefreshCommandOptions
  extends Partial<Pick<Mod, 'remoteFileId' | 'version'>> {
  all?: boolean;
}

@SubCommand({ name: 'refresh' })
export class CountryTagsRefreshCommand implements CommandRunner {
  constructor(
    private countryTagsService: CountryTagsService,
    private modsService: ModsService,
  ) {}

  async run(
    passedParam: string[],
    options?: CountryTagsRefreshCommandOptions,
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
