import { Context, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { TechnologySharingGroup } from '../models/technology-sharing-group.model';
import { ProductEntitiesResolver } from '../../shared/resolvers';
import { ParserService } from '../../parser';
import { SpritesService } from '../../sprites/services/sprites.service';
import { Request } from 'express';

@Resolver(() => TechnologySharingGroup)
export class TechnologySharingGroupsResolver extends ProductEntitiesResolver(
  TechnologySharingGroup,
  {
    plural: 'technologySharingGroups',
  },
) {
  constructor(
    private readonly parserService: ParserService,
    private readonly spritesService: SpritesService,
  ) {
    super(parserService);
  }

  @ResolveField(() => String, { name: 'name' })
  async getName(@Parent() technologySharingGroup: TechnologySharingGroup) {
    const localisation = await technologySharingGroup.getName();
    return localisation.value;
  }

  @ResolveField(() => String, { name: 'description' })
  async getDescription(
    @Parent() technologySharingGroup: TechnologySharingGroup,
  ) {
    const localisation = await technologySharingGroup.getDescription();
    return localisation.value;
  }

  @ResolveField(() => String, { name: 'pictureUrl' })
  async getPictureUrl(
    @Context('req') req: Request,
    @Parent() technologySharingGroup: TechnologySharingGroup,
  ) {
    const productName = req.get('x-product-name');
    const productVersion = req.get('x-product-version');
    const picture = await technologySharingGroup.getPicture();
    return this.spritesService.getUrl(productName, productVersion, picture);
  }
}
