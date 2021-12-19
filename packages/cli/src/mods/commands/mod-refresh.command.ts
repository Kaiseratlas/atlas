import { CommandRunner, Option, SubCommand } from 'nest-commander';
import { ModsService } from '../services/mods.service';

interface ModRefreshCommandOptions {
  all?: boolean;
}

@SubCommand({ name: 'refresh' })
export class ModRefreshCommand implements CommandRunner {
  constructor(private modsService: ModsService) {}

  async runAll() {
    await this.modsService.refreshAll();
  }

  async run(
    passedParam: string[],
    options?: ModRefreshCommandOptions,
  ): Promise<void> {
    if (options.all) {
      await this.runAll();
    }
  }

  @Option({
    flags: '-a, --all',
    description: '',
  })
  parseShell() {
    return true;
  }
}
