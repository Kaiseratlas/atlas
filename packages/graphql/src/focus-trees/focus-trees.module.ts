import { Module } from '@nestjs/common';
import { FocusTreesResolver } from './resolvers/focus-trees.resolver';

@Module({
  providers: [FocusTreesResolver],
})
export class FocusTreesModule {}
