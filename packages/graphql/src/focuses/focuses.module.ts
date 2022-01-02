import { Module } from '@nestjs/common';
import { FocusTreesService } from './services/focus-trees.service';
import { FocusesCommand } from './commands/focuses.command';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Focus } from './models/focus.model';
import { FocusTree } from './models/focus-tree.model';
import { FocusPrerequisite } from './models/focus-prerequisite.model';
import { FocusesResolver } from './resolvers/focuses.resolver';
import { FocusTreesResolver } from './resolvers/focus-trees.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Focus, FocusTree, FocusPrerequisite])],
  providers: [
    FocusTreesService,
    FocusesCommand,
    FocusesResolver,
    FocusTreesResolver,
  ],
})
export class FocusesModule {}
