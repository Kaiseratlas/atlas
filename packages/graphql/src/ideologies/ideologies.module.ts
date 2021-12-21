import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ideology } from './models/ideology.model';
import { IdeologiesResolver } from './resolvers/ideologies.resolver';
import { IdeologiesService } from './services/ideologies.service';
import * as commands from './commands';

@Module({
  imports: [TypeOrmModule.forFeature([Ideology])],
  providers: [
    IdeologiesResolver,
    IdeologiesService,
    ...Object.values(commands),
  ],
  exports: [IdeologiesService],
})
export class IdeologiesModule {}
