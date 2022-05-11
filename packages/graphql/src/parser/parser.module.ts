import { Global, Module, OnModuleInit } from '@nestjs/common';
import Parser, { ENTITIES } from '@kaiseratlas/parser';
import { ProductsService } from '../products/services/products.service';
import { ProductsModule } from '../products/products.module';
import { ParserService } from './services';
import { GamesService } from '../games/services/games.service';

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
            await Promise.all(
              ENTITIES.map((cls) => parser.getManager(cls).load()),
            );
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
