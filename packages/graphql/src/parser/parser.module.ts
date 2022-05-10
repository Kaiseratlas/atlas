import { Global, Module, OnModuleInit } from '@nestjs/common';
import Parser from '@kaiseratlas/parser';
import { ProductsService } from '../products/services/products.service';
import { ProductsModule } from '../products/products.module';
import { ParserService } from './services';
import { GamesService } from '../games/services/games.service';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Global()
@Module({
  imports: [ProductsModule],
  providers: [ParserService],
  exports: [ParserService],
})
export class ParserModule implements OnModuleInit {
  constructor(
    private readonly productsService: ProductsService,
    private readonly gamesService: GamesService,
    private readonly parserService: ParserService,
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  async onModuleInit(): Promise<void> {
    const [products, games] = await Promise.all([
      this.productsService.findAll(),
      this.gamesService.findAll(),
    ]);
    await Promise.all(
      products.map(async (product) => {
        const parsers = await Promise.all(
          product.versions.map((productVersion) => {
            const game = games.find(
              (game) => productVersion.game.id === game.id,
            );
            return Parser.initialize(game, productVersion.dependencies);
          }),
        );
        await Promise.all(
          parsers.map(async (parser) => {
            await Promise.all([
              // Common
              // parser.common.characters.load(),
              parser.common.countries.load(),
              parser.common.ideologies.load(),
              // parser.common.stateCategories.load(),
              // parser.common.units.load(),
              parser.common.resources.load(),
              // // Events
              // parser.events.load(),
              // History
              parser.history.countries.load(),
              // parser.history.states.load(),
              // parser.history.divisions.templates.load(),
              // Interface
              parser.interface.sprites.load(),
              // Localisations
              parser.i18n.load(),
              // // Map
              parser.map.continents.load(),
              // parser.map.provinces.load(),
            ]);
          }),
        );
        product.versions.forEach((productVersion, i) =>
          this.parserService.add(
            product.alias,
            productVersion.version,
            parsers[i],
          ),
        );
      }),
    );
  }
}
