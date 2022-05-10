import { Module } from '@nestjs/common';
import { ContinentsResolver } from './resolvers/continents.resolver';
import { ContinentsService } from './services/continents.service';

@Module({
  providers: [ContinentsResolver, ContinentsService],
  exports: [ContinentsService],
})
export class ContinentsModule {}
