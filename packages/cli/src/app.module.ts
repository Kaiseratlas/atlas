import { Module } from '@nestjs/common';
import { LocalesModule } from './locales/locales.module';
import { SharedModule } from './shared/shared.module';
import { ModsModule } from './mods/mods.module';
import { CountriesModule } from './countries/countries.module';
import { IdeologiesModule } from './ideologies/ideologies.module';
import { StatesModule } from './states/states.module';

@Module({
  imports: [
    LocalesModule,
    SharedModule,
    ModsModule,
    CountriesModule,
    IdeologiesModule,
    StatesModule,
  ],
})
export class AppModule {}
