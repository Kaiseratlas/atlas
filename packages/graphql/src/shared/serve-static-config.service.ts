import { Injectable } from '@nestjs/common';
import {
  ServeStaticModuleOptions,
  ServeStaticModuleOptionsFactory,
} from '@nestjs/serve-static';

@Injectable()
export class ServeStaticConfigService
  implements ServeStaticModuleOptionsFactory
{
  createLoggerOptions(): ServeStaticModuleOptions[] {
    return [
      {
        serveRoot: '/static',
        rootPath: 'client',
      },
    ];
  }
}
