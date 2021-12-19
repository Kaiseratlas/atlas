import { Command, CommandRunner } from 'nest-commander';
import { IdeologiesRefreshCommand } from './ideologies-refresh-command';

interface IdeologiesCommandOptions {
  remoteFileId?: number;
  version?: number;
}

@Command({ name: 'ideologies', subCommands: [IdeologiesRefreshCommand] })
export class IdeologiesCommand implements CommandRunner {
  async run(): Promise<void> {
    console.log(4444);
  }
}
