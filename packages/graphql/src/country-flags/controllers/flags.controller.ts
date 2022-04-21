import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ParserService } from '../../parser';

@Controller('flags')
export class FlagsController {
  constructor(private readonly parserService: ParserService) {}

  @Get(':id')
  async getFlag(
    @Res() res: Response,
    @Param('product_name') productName: string,
    @Param('product_version') productVersion: string,
    @Param('id') id,
    @Query('size') size = 'standard',
  ) {
    //this.parser.common.countries.get();
    const parser = this.parserService.get(productName, productVersion);
    const flag = await parser.common.countries.flags.get(id);
    const buffer = await flag[size].png.toBuffer();
    res.set({ 'Content-Length': buffer.length });
    res.end(buffer);
  }
}
