import { Module } from '@nestjs/common';
import { DifficultySettingsService } from './services/difficulty-settings.service';
import * as resolvers from './resolvers';

@Module({
  providers: [...Object.values(resolvers), DifficultySettingsService],
  exports: [DifficultySettingsService],
})
export class DifficultySettingsModule {}
