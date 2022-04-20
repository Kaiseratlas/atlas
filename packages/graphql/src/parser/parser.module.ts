import {
  ClassProvider,
  DynamicModule,
  Global,
  Inject,
  Module,
  ModuleMetadata,
  OnModuleInit,
  Provider,
  Type,
} from '@nestjs/common';
import Parser, { Game } from '@kaiseratlas/parser';
import { ProductsService } from '../products/services/products.service';
import { ProductsModule } from '../products/products.module';
import { ParserService } from './services/parser.service';
import { GamesService } from '../games/services/games.service';

export class ParserConstants {
  public static readonly PARSER_INSTANCE = 'PARSER_INSTANCE';

  public static readonly PARSER_MODULE_OPTIONS = 'PARSER_MODULE_OPTIONS';
}

interface ParserModuleOptions {
  gamePath: string;
  modPath: string;
}

export type ParserModuleOptionsAsyncOptions = {
  useClass?: Type<MwnModuleOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<ParserModuleOptions> | ParserModuleOptions;
  inject?: any[];
  useExisting?: Type<MwnModuleOptionsFactory>;
} & Pick<ModuleMetadata, 'imports'>;

export interface MwnModuleOptionsFactory {
  createMwnModuleOptions(): Promise<ParserModuleOptions> | ParserModuleOptions;
}

export function InjectParser() {
  return Inject(ParserConstants.PARSER_INSTANCE);
}

@Global()
@Module({
  imports: [ProductsModule],
  providers: [ParserService],
})
export class ParserModule implements OnModuleInit {
  constructor(
    private readonly productsService: ProductsService,
    private readonly gamesService: GamesService,
    private readonly parserService: ParserService,
  ) {}

  async onModuleInit(): Promise<void> {
    const products = await this.productsService.findAll();
    const games = await this.gamesService.findAll();

    console.log('products[0]', products[0].versions[0]);
    console.log(
      'products[0].versions[0].game.id;',
      games.find((game) => products[0].versions[0].game.id === game.id),
    );
    const parser = await Parser.initialize(
      games.find((game) => products[0].versions[0].game.id === game.id),
      products[0].versions[0].dependencies,
    );
    console.log('parser', await parser.map.continents.load())
    // const games = await this.gamesService.findAll();
    // const mods = await games[0].mods.load();
    // console.log('games', mods);
  }

  static forRootAsync(options: ParserModuleOptionsAsyncOptions): DynamicModule {
    const mwnProvider: Provider = {
      inject: [ParserConstants.PARSER_MODULE_OPTIONS],
      provide: ParserConstants.PARSER_INSTANCE,
      useFactory: async (options: ParserModuleOptions) => {
        const hoi4 = Game.fromPath(options.gamePath, {
          modPath: options.modPath,
        });
        const kr = await Parser.initialize(hoi4);
        // await Promise.all([
        //   kr.i18n.load(),
        //   // Common
        //   kr.common.characters.load(),
        //   kr.common.countries.load(),
        //   kr.common.ideologies.load(),
        //   kr.common.stateCategories.load(),
        //   // Events
        //   kr.events.load(),
        //   // History
        //   kr.history.countries.load(),
        //   kr.history.states.load(),
        //   // Map
        //   kr.map.continents.load(),
        //   kr.map.provinces.load(),
        // ]);
        console.log('loaded');
        return kr;
      },
    };

    const asyncProviders = this.createAsyncProviders(options);
    return {
      module: ParserModule,
      imports: [...(options.imports || [])],
      providers: [mwnProvider, ...asyncProviders],
      exports: [mwnProvider],
    };
  }
  private static createAsyncProviders(
    options: ParserModuleOptionsAsyncOptions,
  ): Provider[] {
    if (options.useFactory || options.useExisting) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
        inject: [options.inject || []],
      } as ClassProvider,
    ];
  }

  private static createAsyncOptionsProvider(
    options: ParserModuleOptionsAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: ParserConstants.PARSER_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: ParserConstants.PARSER_MODULE_OPTIONS,
      useFactory: async (
        optionsFactory: MwnModuleOptionsFactory,
      ): Promise<ParserModuleOptions> =>
        optionsFactory.createMwnModuleOptions(),
      inject: options.useClass ? [options.useClass] : [],
    };
  }
}
