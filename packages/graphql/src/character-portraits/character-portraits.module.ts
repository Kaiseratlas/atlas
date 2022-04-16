import { Module } from '@nestjs/common';
import { CharacterPortraitsResolver } from './resolvers/character-portraits.resolver';
import { CharacterPortraitsService } from './services/character-portraits.service';

@Module({
  providers: [CharacterPortraitsResolver, CharacterPortraitsService],
})
export class CharacterPortraitsModule {}
