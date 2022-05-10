import { Injectable } from '@nestjs/common';
import { ParserService } from '../../parser';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ProductEntitiesService } from '../../shared/services/product-entities.service';
import { Country } from '@kaiseratlas/parser';
import { Product } from '../../products/models/product.model';
import { ProductVersion } from '../../products/models/product-version.model';

@Injectable()
export class CountriesService extends ProductEntitiesService(Country) {
  constructor(
    protected readonly parserService: ParserService,
    protected readonly elasticsearchService: ElasticsearchService,
  ) {
    super(parserService, elasticsearchService);
  }

  protected readonly index = 'countries';
  protected readonly mappings = {
    properties: {
      id: { type: 'text', copy_to: ['_all'] },
      name: { type: 'text', copy_to: ['_all'] },
      formalName: { type: 'text', copy_to: ['_all'] },
      product: {
        type: 'object',
      },
      _all: {
        type: 'text',
      },
    },
  };

  async findAll(
    productAlias: Product['alias'],
    version: ProductVersion['version'],
  ) {
    const countries = await super.findAll(productAlias, version);
    return countries.filter(
      (country) => !country.isDynamic && country.tag !== 'XXA',
    );
  }

  protected async transform(country: Country): Promise<any> {
    const [name, formalName] = await Promise.all([
      country.getDefaultName(),
      country.getCurrentName(),
    ]);
    return {
      id: country.tag,
      name: name?.value,
      formalName: formalName?.value,
    };
  }
}
