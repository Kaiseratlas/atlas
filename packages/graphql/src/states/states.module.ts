import { Module } from '@nestjs/common';
import { StatesResolver } from './resolvers/states.resolver';
import { StatesService } from './services/states.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { State } from './models/state.model';

@Module({
  imports: [TypeOrmModule.forFeature([State])],
  providers: [StatesResolver, StatesService],
  exports: [StatesService],
})
export class StatesModule {}
