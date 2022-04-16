import { Injectable } from '@nestjs/common';
import { Character } from '../../characters/models/character.model';

@Injectable()
export class CharacterPortraitsService {
  getUrl(character: Character, type: string, size: string) {
    const flagUrl = new URL(
      `/characters/${character.id}/${type}/${size}`,
      'http://localhost:3000',
    );
    return flagUrl.toString();
  }
}
