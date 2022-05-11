import type { ConnectionOptions } from 'typeorm-seeding';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const config: ConnectionOptions = {
  url: process.env.DATABASE_URL,
  type: 'postgres',

  // We are using migrations, synchronize should be set to false.
  synchronize: false,

  // Run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: false,
  logging: true,

  // Allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev.
  entities: [__dirname + '/../dist/**/*.model{.ts,.js}'],
  migrations: [__dirname + '/../dist/migrations/**/*{.ts,.js}'],
  namingStrategy: new SnakeNamingStrategy(),
  seeds: [__dirname + '/../dist/seeds/**/*{.ts,.js}'],
  factories: [__dirname + '/../dist/factories/**/*{.ts,.js}'],

  cli: {
    // Location of migration should be inside src folder
    // to be compiled into dist/ folder.
    migrationsDir: 'src/migrations',
  },
};

export = config;
