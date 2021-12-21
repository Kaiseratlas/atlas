import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CommandFactory } from 'nest-commander';
import { Logger } from '@nestjs/common';

const isCli = process.env.CLI;

async function bootstrap() {
  if (!isCli) {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
  } else {
    await CommandFactory.run(AppModule, new Logger());
  }
}
bootstrap();
