import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GqlConfigService } from './services/gql-config.service';
import { TypeOrmConfigService } from './services/type-orm-config.service';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from '../config/database.config';
import elasticsearchConfig from '../config/elasticsearch.config';
import { RouterModule } from '@nestjs/core';
import { ROUTES } from './routes.const';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ElasticsearchConfigService } from './services/elasticsearch-config.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, elasticsearchConfig],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),
    ElasticsearchModule.registerAsync({
      useClass: ElasticsearchConfigService,
    }),
    RouterModule.register(ROUTES),
  ],
  exports: [ElasticsearchModule],
})
export class SharedModule {}
