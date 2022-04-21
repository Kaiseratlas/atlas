import { Module } from '@nestjs/common';
import { CharacterPortraitsResolver } from './resolvers/character-portraits.resolver';
import { CharacterPortraitsService } from './services/character-portraits.service';
import { CharactersController } from './controllers/characters.controller';

@Module({
  controllers: [CharactersController],
  providers: [CharacterPortraitsResolver, CharacterPortraitsService],
})
export class CharacterPortraitsModule {}
