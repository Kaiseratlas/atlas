import { Module } from '@nestjs/common';
import { ContinentsResolver } from './continents.resolver';

@Module({
  providers: [ContinentsResolver]
})
export class ContinentsModule {}
