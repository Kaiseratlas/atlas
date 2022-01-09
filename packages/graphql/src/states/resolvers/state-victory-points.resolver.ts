import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { StateVictoryPoints } from '../models';
import { I18nService } from 'nestjs-i18n';

@Resolver(() => StateVictoryPoints)
export class StateVictoryPointsResolver {
  constructor(private i18n: I18nService) {}

  @ResolveField()
  name(@Parent() { provinceId }: StateVictoryPoints) {
    return this.i18n.t(`common.VICTORY_POINTS_${provinceId}`);
  }
}
