import { Command, CommandRunner } from 'nest-commander';
import { StateRefreshCommand } from './state-refresh-command';

@Command({ name: 'state', subCommands: [StateRefreshCommand] })
export class StateCommand implements CommandRunner {
  async run(): Promise<void> {}
}
