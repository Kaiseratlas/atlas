import { CommandRunner, Option, SubCommand } from 'nest-commander';
import { Mod } from '../../mods/entities/mod.entity';
import { ModsService } from '../../mods/services/mods.service';
import { StatesService } from '../services/states.service';

interface StateRefreshCommandOptions
  extends Partial<Pick<Mod, 'remoteFileId' | 'version'>> {
  all?: boolean;
}

@SubCommand({ name: 'refresh' })
export class StateRefreshCommand implements CommandRunner {
  constructor(
    private statesService: StatesService,
    private modsService: ModsService,
  ) {}

  async run(
    passedParam: string[],
    options?: StateRefreshCommandOptions,
  ): Promise<void> {
    if (options?.all) {
      await this.runWithAll();
      return;
    }

    const mod = await this.modsService.findByRemoteId(
      options?.remoteFileId,
      options?.version,
    );

    await this.statesService.refresh(mod);
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
