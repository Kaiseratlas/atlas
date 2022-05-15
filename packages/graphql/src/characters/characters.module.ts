import { Module } from '@nestjs/common';
import { CharactersResolver } from './resolvers/characters.resolver';
import { CharactersService } from './services/characters.service';
import { CountryLeadersResolver } from './resolvers/country-leaders.resolver';

@Module({
  providers: [CharactersResolver, CountryLeadersResolver, CharactersService],
})
export class CharactersModule {}
