import {
  Args,
  ArgsType,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Country } from '../models/country.model';
import { CountriesService } from '../services/countries.service';
import { I18n, I18nContext, I18nService } from 'nestjs-i18n';
import { ModsService } from '../../mods/services/mods.service';
import { StatesService } from '../../states/services/states.service';
import { IdeologiesService } from '../../ideologies/services/ideologies.service';

@Resolver(() => Country)
export class CountriesResolver {
  constructor(
    private statesService: StatesService,
    private i18n: I18nService,
    private modsService: ModsService,
    private ideologiesService: IdeologiesService,
    private countriesService: CountriesService,
  ) {}

  @Query(() => Country, { name: 'country' })
  async getCountry(@Args('tag') tag: string) {
    const mod = await this.modsService.findByRemoteId(1521695605);
    const countryFlags = await this.countriesService.fetchFlagsByTag(tag, mod);
    const flagUrl = countryFlags
      .filter((flag) => !flag.variant)
      .find((flag) => flag.tag.toLowerCase() === tag.toLowerCase());
    return {
      tag,
      name: '',
      flagUrl: `http://localhost:3000/static/gfx/flags/${flagUrl.sha256}.png`,
    };
  }

  @ResolveField()
  async name(@Parent() country: Country): Promise<Country['name']> {
    const mod = await this.modsService.findByRemoteId(1521695605);
    const { politics } = await this.countriesService.fetchHistory(
      country.tag,
      mod,
    );
    return this.i18n.t(`common.${country.tag}_${politics.ideologyName}`);
  }

  @ResolveField()
  async names(@Parent() country: Country): Promise<Country['names']> {
    const mod = await this.modsService.findByRemoteId(1521695605);
    const ideologies = await this.ideologiesService.find(mod);
    const names = await Promise.all(
      ideologies.map((ideology) =>
        this.i18n.t(`common.${country.tag.toUpperCase()}_${ideology.name}`),
      ),
    );
    return ideologies.map((ideology, i) => {
      return {
        variant: ideology.name,
        localizedName: names[i],
      };
    });
  }

  @ResolveField()
  async flags(@Parent() country: Country): Promise<Country['flags']> {
    const { tag } = country;
    const mod = await this.modsService.findByRemoteId(1521695605);
    const flags = await this.countriesService.fetchFlagsByTag(tag, mod);
    return flags.map((flag) => ({
      ...flag,
      url: `http://localhost:3000/static/gfx/flags/${flag.sha256}.png`,
    }));
  }

  @ResolveField()
  async history(@Parent() country: Country): Promise<Country['history']> {
    const { tag } = country;
    const mod = await this.modsService.findByRemoteId(1521695605);
    return this.countriesService.fetchHistory(tag, mod);
  }

  @ResolveField()
  localizedDefaultName(
    @Parent() country: Country,
  ): Promise<Country['localizedDefaultName']> {
    const { tag } = country;
    return this.i18n.t(`common.${tag.toUpperCase()}_social_democrat`);
  }

  @Query(() => [Country], { name: 'countries' })
  async getCountries(@I18n() i18n: I18nContext) {
    const mod = await this.modsService.findByRemoteId(1521695605);
    const [countryTags, countryFlags] = await Promise.all([
      this.countriesService.fetchTags(mod),
      this.countriesService.fetchFlags(mod),
    ]);

    return Promise.all(
      countryTags.map(async ({ tag }) => {
        const flagUrl = countryFlags
          .filter((flag) => !flag.variant)
          .find((flag) => flag.tag === tag);
        return {
          tag,
          flagUrl: `http://localhost:3000/static/gfx/flags/${flagUrl.sha256}.png`,
        };
      }),
    );
  }
}
