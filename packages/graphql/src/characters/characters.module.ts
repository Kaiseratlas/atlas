import { Module } from '@nestjs/common';
import { CharactersResolver } from './resolvers/characters.resolver';

@Module({
  providers: [CharactersResolver],
})
export class CharactersModule {}
