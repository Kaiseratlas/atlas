import { GqlModuleOptions, GqlOptionsFactory } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GqlConfigService implements GqlOptionsFactory {
  createGqlOptions(): Omit<GqlModuleOptions, 'driver'> {
    return {
      autoSchemaFile: true,
      sortSchema: true,
    };
  }
}
