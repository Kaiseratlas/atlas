import { ID, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ModsService } from '../../mods/services/mods.service';
import { Focus } from '../models/focus.model';
import { I18nService } from 'nestjs-i18n';
import { SpritesService } from '../../sprites/services/sprites.service';

@Resolver(() => Focus)
export class FocusesResolver {
  constructor(
    private spritesService: SpritesService,
    private modsService: ModsService,
    private i18n: I18nService,
  ) {}

  @ResolveField(() => String, { name: 'prerequisite' })
  prerequisite(@Parent() focus: Focus) {
    return focus.prerequisite.flatMap((prerequisite) =>
      prerequisite.prerequisiteId.split(','),
    );
  }

  @ResolveField(() => String, { name: 'iconUrl' })
  async iconUrl(@Parent() focus: Focus) {
    try {
      const mod = await this.modsService.findByRemoteId(1521695605);
      const sprite = await this.spritesService.findByName(focus.icon, mod);
      return `${process.env.HOST}/static/gfx/sprites/${sprite.textureHash}.png`;
    } catch (e) {
      return null;
    }
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
}
