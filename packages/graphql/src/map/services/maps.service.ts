import { Injectable } from '@nestjs/common';
import { stringify, INode } from 'svgson';
import { Mod } from '../../mods/models/mod.model';
import path from 'path';
import fs from 'fs';
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
        console.log('attributes', n);
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

    provinces.map((p) => {
      const node = map.get(p.colorHex);

      if (node) {
        node.attributes['id'] = String(p.provinceId);
      }

      if (p.type !== 'land') {
        // const xxx = nodes.map((n) => {
        //   n.attributes['style'] = `fill:black; stroke:none;`;
        //   return n;
        // });
        map.delete(p.colorHex);
      } else {
        if (!node) {
          console.log(node, p);
        } else {
          node.attributes['style'] = `fill:#e0e0e0; stroke:white;`;
          map.set(p.colorHex, node);
        }
      }
    });
    //
    // console.log('map.children', map.children.length);
    // console.log('map.children', Array.from(nodesMap.values()).flat().length);
    //
    svg.children = Array.from(map.values());
    const u = stringify(svg);

    await fs.promises.writeFile('test.svg', u);
  }
}
