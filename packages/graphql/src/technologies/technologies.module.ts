import { Module } from '@nestjs/common';
import { TechnologiesService } from './services/technologies.service';
import * as resolver from './resolvers';

@Module({
  providers: [...Object.values(resolver), TechnologiesService],
  exports: [TechnologiesService],
})
export class TechnologiesModule {}
