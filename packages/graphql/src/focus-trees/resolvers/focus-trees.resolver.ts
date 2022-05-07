import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { FocusTree } from '../models/focus-tree.model';
import { ProductEntitiesResolver } from '../../shared/resolvers';
import { Focus } from '../../focuses/models/focus.model';

@Resolver(() => FocusTree)
export class FocusTreesResolver extends ProductEntitiesResolver(FocusTree, {
  plural: 'focusTrees',
}) {
  @ResolveField(() => String, { name: 'name', nullable: true })
  async getName(@Parent() focusTree: FocusTree) {
    const l = await focusTree.getName();
    return l?.value;
  }
  @ResolveField(() => [Focus], { name: 'focuses' })
  getFocuses(@Parent() focusTree: FocusTree): Focus[] {
    return focusTree.focuses;
  }
}
