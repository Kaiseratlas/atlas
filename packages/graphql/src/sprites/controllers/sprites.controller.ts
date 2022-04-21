import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { Sprite } from '../models/sprite.model';
import { ParserService } from '../../parser';

@Controller('sprites')
export class SpritesController {
  constructor(private readonly parserService: ParserService) {}

  @Get(':id')
  async getSprite(
    @Param('product_name') productName: string,
    @Param('product_version') productVersion: string,
    @Res() res: Response,
    @Param('id') id: Sprite['id'],
  ) {
    const parser = this.parserService.get(productName, productVersion);
    const sprite = await parser.interface.sprites.get(id);
    const buffer = await sprite.png.toBuffer();
    res.set({ 'Content-Length': buffer.length });
    res.end(buffer);
  }
}
