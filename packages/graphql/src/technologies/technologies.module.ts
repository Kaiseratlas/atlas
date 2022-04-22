import { Module } from '@nestjs/common';
import * as resolver from './resolvers';

@Module({
  providers: Object.values(resolver),
})
export class TechnologiesModule {}
