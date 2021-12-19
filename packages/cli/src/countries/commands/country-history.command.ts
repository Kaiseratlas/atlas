import { Command, CommandRunner } from 'nest-commander';
import { CountryHistoryRefreshCommand } from './country-history-refresh-command';

interface CountryTagsCommandOptions {
  remoteFileId?: number;
  version?: number;
}

@Command({
  name: 'country-history',
  subCommands: [CountryHistoryRefreshCommand],
})
export class CountryHistoryCommand implements CommandRunner {
  async run(): Promise<void> {
    console.log('country-history');
  }
}
