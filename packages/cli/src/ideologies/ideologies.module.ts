import { Module } from '@nestjs/common';
import { IdeologiesService } from './services/ideologies.service';
import { IdeologiesCommand } from './commands/ideologies.command';
import { IdeologiesRefreshCommand } from './commands/ideologies-refresh-command';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ideology } from './entities/ideology.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ideology])],
  providers: [IdeologiesService, IdeologiesCommand, IdeologiesRefreshCommand],
})
export class IdeologiesModule {}
