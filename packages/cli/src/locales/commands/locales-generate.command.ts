import { CommandRunner, Option, SubCommand } from 'nest-commander';
import { LocalesService } from '../services/locales.service';
import { Mod } from '../../mods/entities/mod.entity';
import { ModsService } from '../../mods/services/mods.service';

interface LocalesGenerateCommandOptions
  extends Partial<Pick<Mod, 'remoteFileId' | 'version'>> {
  all?: boolean;
}

@SubCommand({ name: 'generate' })
export class LocalesGenerateCommand implements CommandRunner {
  constructor(
    private modsService: ModsService,
    private localesService: LocalesService,
  ) {}

  async run(
    passedParam: string[],
    options?: LocalesGenerateCommandOptions,
  ): Promise<void> {
    if (options?.all) {
      await this.runWithAll();
      return;
    }
    const mod = await this.modsService.findByRemoteId(
      options?.remoteFileId,
      options?.version,
    );
    await this.localesService.generate(mod);
  }

  async runWithAll() {
    const mods = await this.modsService.findAll();
    await Promise.all(mods.map((mod) => this.localesService.generate(mod)));
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
