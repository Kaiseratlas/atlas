import { Global, Module } from '@nestjs/common';
import { I18nJsonParser, I18nModule } from 'nestjs-i18n';
// import { I18nConfig1Service } from './i18n-config.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './type-orm-config.service';
import { GqlConfigService } from './gql-config.service';
import { ServeStaticConfigService } from './serve-static-config.service';

const isCli = process.env.CLI;

@Global()
@Module({
  imports: [
    I18nModule.forRoot({
      parser: I18nJsonParser,
      fallbackLanguage: 'english-0_19_2',
      parserOptions: {
        path: !isCli ? path.resolve(__dirname, '../../dist/i18n') : '../',
        watch: true,
      },
    }),
    ServeStaticModule.forRootAsync({
      useClass: ServeStaticConfigService,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    GraphQLModule.forRootAsync({
      useClass: GqlConfigService,
    }),
  ],
})
export class SharedModule {}
