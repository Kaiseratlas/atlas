import { Module } from '@nestjs/common';
import { DivisionsService } from './services/divisions.service';
import * as resolvers from './resolvers';

@Module({
  providers: Object.values(resolvers),
})
export class DivisionsModule {}
