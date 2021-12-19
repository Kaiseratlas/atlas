import { Command, CommandRunner } from 'nest-commander';
import { CountryFlagsRefreshCommand } from './country-flags-refresh-command';

interface CountryFlagsCommandOptions {
  remoteFileId?: number;
  version?: number;
}

@Command({ name: 'country-flags', subCommands: [CountryFlagsRefreshCommand] })
export class CountryFlagsCommand implements CommandRunner {
  async run(): Promise<void> {}
}
