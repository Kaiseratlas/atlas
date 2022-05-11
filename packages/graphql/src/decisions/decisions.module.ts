import { Module } from '@nestjs/common';
import * as services from './services/decisions.service';
import * as resolvers from './resolvers';

@Module({
  providers: [...Object.values(resolvers), ...Object.values(services)],
  exports: Object.values(services),
})
export class DecisionsModule {}
