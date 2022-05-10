import { Module } from '@nestjs/common';
import { CharactersResolver } from './resolvers/characters.resolver';
import { CharactersService } from './services/characters.service';

@Module({
  providers: [CharactersResolver, CharactersService],
})
export class CharactersModule {}
