import { CommandRunner, Option, Command } from 'nest-commander';
import { Mod } from '../../mods/models/mod.model';
import { ModsService } from '../../mods/services/mods.service';
import { CountryHistoryService, CountryLeadersService } from '../services';

interface CountryHistoryCommandOptions
  extends Partial<Pick<Mod, 'remoteFileId' | 'version'>> {
  all?: boolean;
}

@Command({ name: 'country-history' })
export class CountryHistoryCommand implements CommandRunner {
  constructor(
    private countryHistoryService: CountryHistoryService,
    private countryLeadersService: CountryLeadersService,
    private modsService: ModsService,
  ) {}

  async run(
    passedParam: string[],
    options?: CountryHistoryCommandOptions,
  ): Promise<void> {
    if (options?.all) {
      await this.runWithAll();
      return;
    }

    const mod = await this.modsService.findByRemoteId(
      options?.remoteFileId,
      options?.version,
    );

    await this.countryHistoryService.refresh(mod);
    //await this.countryLeadersService.refreshPortraits(mod);
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
