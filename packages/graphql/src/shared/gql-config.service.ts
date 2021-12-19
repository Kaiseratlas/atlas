import { Injectable } from '@nestjs/common';
import type { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  createGqlOptions(): GqlModuleOptions {
    return {
      // debug: false,
      // playground: false,
      autoSchemaFile: true,
      sortSchema: true,
    };
  }
}
