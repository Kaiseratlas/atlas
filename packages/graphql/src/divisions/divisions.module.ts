import { Module } from '@nestjs/common';
import * as resolvers from './resolvers';

@Module({
  providers: Object.values(resolvers),
})
export class DivisionsModule {}
