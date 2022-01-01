import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { FocusTree } from '../models/focus-tree.model';
import { FocusTreesService } from '../services/focus-trees.service';
import { ModsService } from '../../mods/services/mods.service';
import { Focus } from '../models/focus.model';
import { I18nService } from 'nestjs-i18n';

@Resolver(() => Focus)
export class FocusesResolver {
  constructor(
    private modsService: ModsService,
    private i18n: I18nService,
    private focusTreesService: FocusTreesService,
  ) {}

  @ResolveField(() => String, { name: 'prerequisite' })
  prerequisite(@Parent() focus: Focus) {
    return focus.prerequisite.map(
      (prerequisite) => prerequisite.prerequisiteId,
    );
  }

  @ResolveField(() => String, { name: 'title' })
  getTitle(@Parent() focus: Focus) {
    return this.i18n.t(`common.${focus.focusId}`);
  }

  @ResolveField(() => String, { name: 'description' })
  getDescription(@Parent() focus: Focus) {
    return this.i18n.t(`common.${focus.focusId}_desc`);
  }

  @ResolveField(() => ID, { name: 'id' })
  getId(@Parent() focus: Focus) {
    return focus.focusId;
  }

  @Query(() => FocusTree, { name: 'focusTree' })
  async getFocusTree(@Args('id') treeId: string): Promise<FocusTree> {
    const mod = await this.modsService.findByRemoteId(1521695605);
    const tree = await this.focusTreesService.findById(treeId, mod);
    return tree;
  }
}
