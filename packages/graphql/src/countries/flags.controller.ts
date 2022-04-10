import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { InjectParser } from '../parser/parser.module';
import Parser from '@kaiseratlas/parser';
import type { Response } from 'express';

@Controller('flags')
export class FlagsController {
  constructor(@InjectParser() protected parser: Parser) {}

  @Get(':country_tag')
  async getFlag(
    @Res() res: Response,
    @Param('country_tag') countryTag,
    @Query('size') size = 'standard',
    @Query('variant') variant = null,
  ) {
    //this.parser.common.countries.get();
    const country = await this.parser.common.countries.get(countryTag);
    const flag = await country.flags.get(variant);
    const buffer = await flag[size].png.toBuffer();
    res.set({ 'Content-Length': buffer.length });
    res.end(buffer);
  }
}
