import { Injectable } from '@nestjs/common';
import fs from 'fs';
import { INode, parse } from 'svgson';

@Injectable()
export class SvgService {
  async readSvgFile(filepath: string): Promise<INode> {
    const data = await fs.promises.readFile(filepath);
    return parse(data.toString());
  }
}
