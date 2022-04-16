import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import Parser from '@kaiseratlas/parser';
import { InjectParser } from '../../parser/parser.module';
import { Character } from '../models/character.model';

@Controller('characters')
export class CharactersController {
  constructor(@InjectParser() private parser: Parser) {}

  @Get(':id/:type/:size')
  async getPortrait(
    @Res() res: Response,
    @Param('id') id: Character['id'],
    @Param('type') type: string,
    @Param('size') size: string,
  ) {
    const character = await this.parser.common.characters.get(id);
    const portrait = character.portraits[type];
    const buffer = await portrait[size].png.toBuffer();
    res.set({ 'Content-Length': buffer.length });
    res.end(buffer);
  }
}
