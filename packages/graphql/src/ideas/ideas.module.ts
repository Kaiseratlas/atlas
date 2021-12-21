import { Module } from '@nestjs/common';
import { IdeasService } from './services/ideas.service';
import { IdeasCommand } from './commands/ideas.command';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Idea } from './models/idea.model';

@Module({
  imports: [TypeOrmModule.forFeature([Idea])],
  providers: [IdeasService, IdeasCommand],
  exports: [IdeasService],
})
export class IdeasModule {}
