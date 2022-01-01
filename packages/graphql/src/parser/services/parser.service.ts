import { Injectable, OnModuleInit } from '@nestjs/common';
import { Jomini } from 'jomini';
import fs from 'fs';

export function convertToArray(out: unknown | unknown[]) {
  if (!out) {
    return [];
  }

  if (Array.isArray(out)) {
    return out;
  }

  return [out];
}

@Injectable()
export class ParserService implements OnModuleInit {
  private parser: Jomini;

  async onModuleInit(): Promise<void> {
    this.parser = await Jomini.initialize();
  }

  async parseFile(filepath: string) {
    const data = await fs.promises.readFile(filepath);
    return this.parser.parseText(data);
  }
}
