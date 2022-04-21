import { ResolveField, Resolver, Parent, Context } from '@nestjs/graphql';
import { CountryFlag } from '../models/country-flag.model';
import { CountryFlagsService } from '../services/country-flags.service';
import { ParserService } from '../../parser';
import type { Request } from 'express';
import { ProductEntitiesResolver } from '../../shared/resolvers';

@Resolver(() => CountryFlag)
export class CountryFlagsResolver extends ProductEntitiesResolver(CountryFlag, {
  plural: 'countryFlags',
}) {
  constructor(
    private readonly parserService: ParserService,
    private readonly countryFlagsService: CountryFlagsService,
  ) {
    super(parserService);
  }

  @ResolveField(() => String, { name: 'url' })
  getUrl(@Context('req') req: Request, @Parent() countryFlag: CountryFlag) {
    const productName = req.get('x-product-name');
    const productVersion = req.get('x-product-version');
    return this.countryFlagsService.getUrl(
      productName,
      productVersion,
      countryFlag,
    );
  }
}
