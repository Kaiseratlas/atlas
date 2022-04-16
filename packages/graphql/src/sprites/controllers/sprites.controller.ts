import { Controller, Get, Param, Res } from '@nestjs/common';
import { InjectParser } from '../../parser/parser.module';
import Parser from '@kaiseratlas/parser';
import { Response } from 'express';
import { Sprite } from '../models/sprite.model';

@Controller('sprites')
export class SpritesController {
  constructor(@InjectParser() protected parser: Parser) {}

  @Get(':id')
  async getSprite(@Res() res: Response, @Param('id') id: Sprite['id']) {
    const sprite = await this.parser.interface.sprites.get(id);
    const buffer = await sprite.png.toBuffer();
    res.set({ 'Content-Length': buffer.length });
    res.end(buffer);
  }
}
