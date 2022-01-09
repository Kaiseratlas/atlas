import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CountryNavyLeader } from '../models';
import { I18nService } from 'nestjs-i18n';

@Resolver(() => CountryNavyLeader)
export class CountryNavyLeadersResolver {
  constructor(private i18n: I18nService) {}

  @ResolveField(() => String, { name: 'description' })
  getDescription(
    @Parent() countryNavyLeader: CountryNavyLeader,
  ): Promise<CountryNavyLeader['description']> {
    return this.i18n.t(`common.${countryNavyLeader.description}`);
  }

  @ResolveField(() => String, { name: 'portraitUrl' })
  getPortraitUrl(
    @Parent() countryNavyLeader: CountryNavyLeader,
  ): CountryNavyLeader['portraitUrl'] {
    return `${process.env.HOST}/static/gfx/leaders/${countryNavyLeader.pictureHash}.png`;
  }
}
