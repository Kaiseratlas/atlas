import { Injectable } from '@nestjs/common';
import { Sprite } from '../models/sprite.model';

@Injectable()
export class SpritesService {
  getUrl(sprite: Sprite): string {
    const flagUrl = new URL(`/sprites/${sprite.id}`, 'http://localhost:3000');
    return flagUrl.toString();
  }
}
