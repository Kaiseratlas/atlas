import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ParserService } from '../../parser';
import { getClassByIndex } from '../search.helpers';

@Injectable()
export class SearchService {
  constructor(
    private readonly parserService: ParserService,
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  async search(term: string) {
    const { hits } = await this.elasticsearchService.search<any>({
      query: {
        bool: {
          must: [
            {
              match: {
                _all: {
                  query: term,
                  fuzziness: 'AUTO',
                },
              },
            },
            {
              match: {
                'product.name': 'kaiserreich',
              },
            },
            {
              match: {
                'product.version': '0.20.1',
              },
            },
          ],
        },
      },
    });
    const kr = this.parserService.get('kaiserreich', '0.20.1');
    return Promise.all(
      hits.hits.map((hit) =>
        kr.getManager(getClassByIndex(hit._index)).get(hit._source.id),
      ),
    );
  }
}
