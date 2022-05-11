import { Module } from '@nestjs/common';
import { FocusesService } from './services/focuses.service';
import * as resolvers from './resolvers';

@Module({
  providers: [...Object.values(resolvers), FocusesService],
  exports: [FocusesService],
})
export class FocusesModule {}
