import { Module } from '@nestjs/common';
import { CharactersResolver } from './characters.resolver';
import { CharactersController } from './controllers/characters.controller';

@Module({
  providers: [CharactersResolver],
  controllers: [CharactersController]
})
export class CharactersModule {}
