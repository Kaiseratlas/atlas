import { Module } from '@nestjs/common';
import { LocalesService } from './services/locales.service';
import { LocalesCommand } from './commands/locales.command';
import { LocalesGenerateCommand } from './commands/locales-generate.command';

@Module({
  providers: [LocalesService, LocalesCommand, LocalesGenerateCommand],
})
export class LocalesModule {}
