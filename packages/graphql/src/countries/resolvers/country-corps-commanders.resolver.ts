import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CountryCorpsCommander } from '../models';
import { I18nService } from 'nestjs-i18n';

@Resolver(() => CountryCorpsCommander)
export class CountryCorpsCommandersResolver {
  constructor(private i18n: I18nService) {}

  @ResolveField(() => String, { name: 'description' })
  getDescription(
    @Parent() countryCorpsCommander: CountryCorpsCommander,
  ): Promise<CountryCorpsCommander['description']> {
    return this.i18n.t(`common.${countryCorpsCommander.description}`);
  }

  @ResolveField(() => String, { name: 'portraitUrl' })
  getPortraitUrl(
    @Parent() countryCorpsCommander: CountryCorpsCommander,
  ): CountryCorpsCommander['portraitUrl'] {
    return `${process.env.HOST}/static/gfx/leaders/${countryCorpsCommander.pictureHash}.png`;
  }
}
