import { Command, CommandRunner, Option } from 'nest-commander';
import { IdeasService } from '../services/ideas.service';
import { ModsService } from '../../mods/services/mods.service';

interface IdeasCommandOptions {
  remoteFileId?: number;
  version?: string;
  all?: boolean;
}

@Command({ name: 'ideas' })
export class IdeasCommand implements CommandRunner {
  constructor(
    private modsService: ModsService,
    private ideasService: IdeasService,
  ) {}

  async run(
    passedParam: string[],
    options?: IdeasCommandOptions,
  ): Promise<void> {
    if (options?.all) {
      //await this.runWithAll();
      return;
    }

    const mod = await this.modsService.findByRemoteId(
      options?.remoteFileId,
      options?.version,
    );

    await this.ideasService.refresh(mod);
    await this.ideasService.refreshPictures(mod);
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
