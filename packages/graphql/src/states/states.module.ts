import { Module } from '@nestjs/common';
import { StatesService } from './services/states.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as models from './models';
import * as resolvers from './resolvers';
import { StatesCommand } from './commands/states.command';

@Module({
  imports: [TypeOrmModule.forFeature(Object.values(models))],
  providers: [StatesCommand, ...Object.values(resolvers), StatesService],
  exports: [StatesService],
})
export class StatesModule {}
