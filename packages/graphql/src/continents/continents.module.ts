import { Module } from '@nestjs/common';
import { ContinentsResolver } from './resolvers/continents.resolver';

@Module({
  providers: [ContinentsResolver],
})
export class ContinentsModule {}
