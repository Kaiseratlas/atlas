import { Module } from '@nestjs/common';
import * as resolvers from './resolvers';
import * as services from './services';

@Module({
  providers: [...Object.values(resolvers), ...Object.values(services)],
  exports: Object.values(services),
})
export class UnitsModule {}
