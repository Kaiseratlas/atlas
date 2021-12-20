import { Module } from '@nestjs/common';
import { CountryTagsService } from './services/country-tags.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryTag } from './entities/country-tag.entity';
import { CountryTagsCommand } from './commands/country-tags.command';
import { CountryTagsRefreshCommand } from './commands/country-tags-refresh-command';
import { CountryFlagsCommand } from './commands/country-flags.command';
import { CountryFlagsRefreshCommand } from './commands/country-flags-refresh-command';
import { CountryFlagsService } from './services/country-flags.service';
import { CountryFlag } from './entities/country-flag.entity';
import { CountryHistory } from './entities/country-history.entity';
import { CountryHistoryService } from './services/country-history.service';
import { CountryHistoryCommand } from './commands/country-history.command';
import { CountryHistoryRefreshCommand } from './commands/country-history-refresh-command';
import { CountryPolitics } from './entities/country-politics';
import { IdeologiesModule } from '../ideologies/ideologies.module';

@Module({
  imports: [
    IdeologiesModule,
    TypeOrmModule.forFeature([
      CountryTag,
      CountryFlag,
      CountryHistory,
      CountryPolitics,
    ]),
  ],
  providers: [
    CountryTagsService,
    CountryFlagsService,
    CountryHistoryService,
    CountryTagsCommand,
    CountryTagsRefreshCommand,
    CountryFlagsCommand,
    CountryFlagsRefreshCommand,
    CountryHistoryCommand,
    CountryHistoryRefreshCommand,
  ],
})
export class CountriesModule {}
