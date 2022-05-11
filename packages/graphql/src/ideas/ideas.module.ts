import { Module } from '@nestjs/common';
import * as resolvers from './resolvers';
import { IdeasService } from './services/ideas.service';

@Module({
  providers: [...Object.values(resolvers), IdeasService],
  exports: [IdeasService],
})
export class IdeasModule {}
