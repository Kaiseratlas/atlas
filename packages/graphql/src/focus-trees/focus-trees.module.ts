import { Module } from '@nestjs/common';
import { FocusTreesResolver } from './resolvers/focus-trees.resolver';
import { FocusTreesService } from './services/focus-trees.service';

@Module({
  providers: [FocusTreesResolver, FocusTreesService],
  exports: [FocusTreesService],
})
export class FocusTreesModule {}
