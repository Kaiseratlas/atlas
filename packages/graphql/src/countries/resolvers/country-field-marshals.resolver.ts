import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { CountryFieldMarshal } from '../models';
import { I18nService } from 'nestjs-i18n';

@Resolver(() => CountryFieldMarshal)
export class CountryFieldMarshalsResolver {
  constructor(private i18n: I18nService) {}

  @ResolveField(() => String, { name: 'description', nullable: true })
  getDescription(
    @Parent() countryFieldMarshal: CountryFieldMarshal,
  ): Promise<CountryFieldMarshal['description']> {
    if (!countryFieldMarshal.description) {
      return null;
    }

    return this.i18n.t(`common.${countryFieldMarshal.description}`);
  }

  @ResolveField(() => String, { name: 'portraitUrl' })
  getPortraitUrl(
    @Parent() countryFieldMarshal: CountryFieldMarshal,
  ): CountryFieldMarshal['portraitUrl'] {
    return `${process.env.HOST}/static/gfx/leaders/${countryFieldMarshal.pictureHash}.png`;
  }
}
