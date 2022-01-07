import { CommandRunner, Option, Command } from 'nest-commander';
import { Mod } from '../../mods/models/mod.model';
import { ModsService } from '../../mods/services/mods.service';
import { CountryFlagsService } from '../services';
import { CountryColorsService } from '../services/country-colors.service';

interface CountryColorsCommandOptions
  extends Partial<Pick<Mod, 'remoteFileId' | 'version'>> {
  all?: boolean;
}

@Command({ name: 'country-colors' })
export class CountryColorsCommand implements CommandRunner {
  constructor(
    private countryColorsService: CountryColorsService,
    private modsService: ModsService,
  ) {}

  async run(
    passedParam: string[],
    options?: CountryColorsCommandOptions,
  ): Promise<void> {
    if (options?.all) {
      await this.runWithAll();
      return;
    }

    const mod = await this.modsService.findByRemoteId(
      options?.remoteFileId,
      options?.version,
    );

    await this.countryColorsService.refresh(mod);
  }

  async runWithAll(): Promise<void> {
    // const mods = await this.modsService.findAll();
    // await Promise.all(mods.map((mod) => this.countryFlagsService.refresh(mod)));
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
