import { CommandRunner, Option, SubCommand } from 'nest-commander';
import { Mod } from '../../mods/entities/mod.entity';
import { IdeologiesService } from '../services/ideologies.service';
import { ModsService } from '../../mods/services/mods.service';

interface CountryTagsRefreshCommandOptions
  extends Partial<Pick<Mod, 'remoteFileId' | 'version'>> {
  all?: boolean;
}

@SubCommand({ name: 'refresh' })
export class IdeologiesRefreshCommand implements CommandRunner {
  constructor(
    private ideologiesService: IdeologiesService,
    private modsService: ModsService,
  ) {}

  async run(
    passedParam: string[],
    options?: CountryTagsRefreshCommandOptions,
  ): Promise<void> {
    console.log('modmod');
    if (options?.all) {
      await this.runWithAll();
      return;
    }

    const mod = await this.modsService.findByRemoteId(
      options?.remoteFileId,
      options?.version,
    );
    console.log('mod', mod);
    await this.ideologiesService.refresh(mod);
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
