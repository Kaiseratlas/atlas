import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import path from 'path';

const isCli = process.env.CLI;

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'sqlite',
      database: path.resolve(__dirname, `../../../../data/db.sqlite`),
      autoLoadEntities: true,
      synchronize: true,
      logging: !!isCli,
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
