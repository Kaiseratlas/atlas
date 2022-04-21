import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { Character } from '../models/character.model';
import { ParserService } from '../../parser/services/parser.service';

@Controller('characters')
export class CharactersController {
  constructor(private readonly parserService: ParserService) {}

  @Get(':id/:type/:size')
  async getPortrait(
    @Res() res: Response,
    @Param('id') id: Character['id'],
    @Param('type') type: string,
    @Param('size') size: string,
  ) {
    const parser = this.parserService.get('kaiserreich', '0.20.1');
    const character = await parser.common.characters.get(id);
    const portrait = character.portraits[type];
    const buffer = await portrait[size].png.toBuffer();
    res.set({ 'Content-Length': buffer.length });
    res.end(buffer);
  }
}
