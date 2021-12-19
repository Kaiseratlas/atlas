import { Command, CommandRunner } from 'nest-commander';
import { ModRefreshCommand } from './mod-refresh.command';

interface ModCommandOptions {
  remoteFileId?: number;
  version?: number;
}

@Command({ name: 'mod', subCommands: [ModRefreshCommand] })
export class ModCommand implements CommandRunner {
  async run(): Promise<void> {}
}
