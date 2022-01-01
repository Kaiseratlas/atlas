import { Global, Module } from '@nestjs/common';
import { ParserService } from './services/parser.service';

@Global()
@Module({
  providers: [ParserService],
  exports: [ParserService],
})
export class ParserModule {}
