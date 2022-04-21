import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GqlConfigService } from './services/gql-config.service';
import { TypeOrmConfigService } from './services/type-orm-config.service';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from '../config/database.config';
import { RouterModule } from '@nestjs/core';
import { ROUTES } from './routes.const';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),
    RouterModule.register(ROUTES),
  ],
})
export class SharedModule {}
