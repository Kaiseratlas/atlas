import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { Character } from '../../characters/models/character.model';
import { ParserService } from '../../parser';

@Controller('characters')
export class CharactersController {
  constructor(private readonly parserService: ParserService) {}

  @Get(':id/:type/:size')
  async getPortrait(
    @Res() res: Response,
    @Param('product_name') productName: string,
    @Param('product_version') productVersion: string,
    @Param('id') id: Character['id'],
    @Param('type') type: string,
    @Param('size') size: string,
  ) {
    const parser = this.parserService.get(productName, productVersion);
    const character = await parser.common.characters.get(id);
    const portrait = character.portraits[type];
    const buffer = await portrait[size].png.toBuffer();
    res.set({ 'Content-Length': buffer.length });
    res.end(buffer);
  }
}
