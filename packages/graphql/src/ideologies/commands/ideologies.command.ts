import { CommandRunner, Option, Command } from 'nest-commander';
import { Mod } from '../../mods/models/mod.model';
import { IdeologiesService } from '../services/ideologies.service';
import { ModsService } from '../../mods/services/mods.service';

interface IdeologiesCommandOptions
  extends Partial<Pick<Mod, 'remoteFileId' | 'version'>> {
  all?: boolean;
}

@Command({ name: 'ideologies' })
export class IdeologiesCommand implements CommandRunner {
  constructor(
    private ideologiesService: IdeologiesService,
    private modsService: ModsService,
  ) {}

  async run(
    passedParam: string[],
    options?: IdeologiesCommandOptions,
  ): Promise<void> {
    if (options?.all) {
      await this.runWithAll();
      return;
    }

    const mod = await this.modsService.findByRemoteId(
      options?.remoteFileId,
      options?.version,
    );

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
