import { Args, ArgsType, Query, Resolver } from '@nestjs/graphql';
import { Country } from '../models/country.model';
import { CountriesService } from '../services/countries.service';
import { I18n, I18nContext, I18nService } from 'nestjs-i18n';
import { ModsService } from '../../mods/services/mods.service';

@Resolver(() => Country)
export class CountriesResolver {
  constructor(
    private i18n: I18nService,
    private modsService: ModsService,
    private countriesService: CountriesService,
  ) {}

  @Query(() => Country, { name: 'country' })
  async getCountry(@Args('tag') tag: string): Promise<Country> {
    const mod = await this.modsService.findByRemoteId(1521695605);
    const countryFlags = await this.countriesService.fetchFlagsByTag(tag, mod);
    const flagUrl = countryFlags
      .filter((flag) => !flag.variant)
      .find((flag) => flag.tag === tag);
    return {
      tag,
      name: '',
      flagUrl: `http://localhost:3000/static/gfx/flags/${flagUrl.sha256}.png`,
    };
  }

  @Query(() => [Country], { name: 'countries' })
  async getCountries(@I18n() i18n: I18nContext): Promise<Country[]> {
    const mod = await this.modsService.findByRemoteId(1521695605);
    const [countryTags, countryFlags] = await Promise.all([
      this.countriesService.fetchTags(mod),
      this.countriesService.fetchFlags(mod),
    ]);

    // const history = await this.countriesService.fetchHistory(
    //   'AFG',
    //   'Afghanistan',
    // );
    // return Promise.all(
    //   countryTags.map(async (tag, i) => ({
    //     tag,
    //     name: await this.i18n.t(`user.kr.political.1.d`, { lang: 'spanish' }),
    //     flagUrl: flagUrls[i],
    //   })),
    // );
    return Promise.all(
      countryTags.map(async ({ tag }) => {
        const flagUrl = countryFlags
          .filter((flag) => !flag.variant)
          .find((flag) => flag.tag === tag);
        return {
          tag,
          name: await this.i18n.t(`common.AFG_social_democrat`, {
            lang: `russian-0_19_2`,
          }),
          flagUrl: `http://localhost:3000/static/gfx/flags/${flagUrl.sha256}.png`,
        };
      }),
    );
  }
}
