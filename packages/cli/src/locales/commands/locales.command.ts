import { Command, CommandRunner } from 'nest-commander';
import { LocalesGenerateCommand } from './locales-generate.command';

interface LocalesCommandOptions {
  remoteFileId?: number;
  version?: number;
}

@Command({ name: 'locales', subCommands: [LocalesGenerateCommand] })
export class LocalesCommand implements CommandRunner {
  async run(): Promise<void> {}
}
