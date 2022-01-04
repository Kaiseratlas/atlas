import { Injectable } from '@nestjs/common';
import { stringify, INode, parse } from 'svgson';
import { Mod } from '../../mods/models/mod.model';
import path from 'path';
import { ProvincesService } from './provinces.service';
import { SvgService } from './svg.service';

function parseNodeStyle(node: INode): Record<string, string> {
  const style = node.attributes?.['style'] ?? '';
  const entries = style.split(';').map((prop) => {
    const [name, value] = prop.split(':');
    return [name, value];
  });
  return Object.fromEntries(entries);
}

@Injectable()
export class MapsService {
  constructor(
    private provincesService: ProvincesService,
    private svgService: SvgService,
  ) {}

  createProvincesMap(svg: INode) {
    const map = new Map<string, INode>();
    for (const node of svg.children) {
      // fill:#3910f4; stroke:none;
      const style = parseNodeStyle(node);
      const colorHex = style['fill'];
      const n = map.get(colorHex);

      if (!n) {
        map.set(colorHex, node);
      } else {
        //console.log('attributes', n);
        node.attributes['d'] = n.attributes['d'] + ' ' + node.attributes['d'];
        map.set(colorHex, node);
      }
    }

    return map;
  }

  async test(mod: Mod) {
    const mapPath = path.resolve(mod.path, 'map', 'provinces.svg');
    const provinces = await this.provincesService.findAll(mod);
    const svg = await this.svgService.readSvgFile(mapPath);
    const map = this.createProvincesMap(svg);
    // console.log('map', map);

    const locations = provinces
      .map((province) => {
        const node = map.get(province.colorHex);
        if (!node) {
          return null;
        }

        const id = province.provinceId;
        const path = node.attributes['d'];

        return { id, path };
      })
      .filter((location) => !!location);

    return locations;
  }
}
