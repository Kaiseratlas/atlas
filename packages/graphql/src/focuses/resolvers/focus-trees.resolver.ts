import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Focus } from '../models/focus.model';
import { FocusTree } from '../models/focus-tree.model';
import { SpritesService } from '../../sprites/services/sprites.service';
import { ModsService } from '../../mods/services/mods.service';
import { I18nService } from 'nestjs-i18n';
import { FocusTreesService } from '../services/focus-trees.service';

@Resolver(() => FocusTree)
export class FocusTreesResolver {
  constructor(
    private spritesService: SpritesService,
    private modsService: ModsService,
    private i18n: I18nService,
    private focusTreesService: FocusTreesService,
  ) {}

  @ResolveField(() => String, { name: 'title' })
  title(@Parent() tree: FocusTree) {
    return this.i18n.t(`common.${tree.treeId}`);
  }

  @Query(() => [FocusTree], { name: 'focusTree' })
  async getFocusTrees() {
    const mod = await this.modsService.findByRemoteId(1521695605);
    return this.focusTreesService.findAll(mod);
  }

  @Query(() => FocusTree, { name: 'focusTree' })
  async getFocusTree(@Args('id') treeId: string): Promise<FocusTree> {
    const mod = await this.modsService.findByRemoteId(1521695605);
    const tree = await this.focusTreesService.findById(treeId, mod);
    return tree;
  }
}
