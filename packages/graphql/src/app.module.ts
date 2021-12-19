import { Module } from '@nestjs/common';
import { CountriesModule } from './countries/countries.module';
import { SharedModule } from './shared/shared.module';
import { ModsModule } from './mods/mods.module';
import { IdeologiesModule } from './ideologies/ideologies.module';

@Module({
  imports: [CountriesModule, SharedModule, ModsModule, IdeologiesModule],
})
export class AppModule {}
