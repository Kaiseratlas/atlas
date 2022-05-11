import type {
  ElasticsearchModuleOptions,
  ElasticsearchOptionsFactory,
} from '@nestjs/elasticsearch';
import { Inject } from '@nestjs/common';
import elasticsearchConfig from '../../config/elasticsearch.config';
import { ConfigType } from '@nestjs/config';

export class ElasticsearchConfigService implements ElasticsearchOptionsFactory {
  constructor(
    @Inject(elasticsearchConfig.KEY)
    private esConfig: ConfigType<typeof elasticsearchConfig>,
  ) {}

  createElasticsearchOptions(): ElasticsearchModuleOptions {
    return {
      node: this.esConfig.hosts,
    };
  }
}
