import { CommandRunner, Option, SubCommand } from 'nest-commander';
import { Mod } from '../../mods/entities/mod.entity';
import { ModsService } from '../../mods/services/mods.service';
import { CountryFlagsService } from '../services/country-flags.service';

interface CountryFlagsRefreshCommandOptions
  extends Partial<Pick<Mod, 'remoteFileId' | 'version'>> {
  all?: boolean;
}

@SubCommand({ name: 'refresh' })
export class CountryFlagsRefreshCommand implements CommandRunner {
  constructor(
    private countryFlagsService: CountryFlagsService,
    private modsService: ModsService,
  ) {}

  async run(
    passedParam: string[],
    options?: CountryFlagsRefreshCommandOptions,
  ): Promise<void> {
    if (options?.all) {
      await this.runWithAll();
      return;
    }

    const mod = await this.modsService.findByRemoteId(
      options?.remoteFileId,
      options?.version,
    );

    await this.countryFlagsService.refresh(mod);
  }

  async runWithAll(): Promise<void> {
    const mods = await this.modsService.findAll();
    await Promise.all(mods.map((mod) => this.countryFlagsService.refresh(mod)));
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
