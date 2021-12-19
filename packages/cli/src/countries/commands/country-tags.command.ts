import { Command, CommandRunner } from 'nest-commander';
import { CountryTagsRefreshCommand } from './country-tags-refresh-command';

interface CountryTagsCommandOptions {
  remoteFileId?: number;
  version?: number;
}

@Command({ name: 'country-tags', subCommands: [CountryTagsRefreshCommand] })
export class CountryTagsCommand implements CommandRunner {
  async run(): Promise<void> {}
}
