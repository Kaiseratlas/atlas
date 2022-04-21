import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ParserService } from '../parser/services/parser.service';

@Controller('flags')
export class FlagsController {
  constructor(private readonly parserService: ParserService) {}

  @Get(':country_tag')
  async getFlag(
    @Res() res: Response,
    @Param('country_tag') countryTag,
    @Query('size') size = 'standard',
    @Query('variant') variant = null,
  ) {
    //this.parser.common.countries.get();
    const parser = this.parserService.get('kaiserreich', '0.20.1');
    const country = await parser.common.countries.get(countryTag);
    const flag = await country.flags.get(variant);
    const buffer = await flag[size].png.toBuffer();
    res.set({ 'Content-Length': buffer.length });
    res.end(buffer);
  }
}
