import { Injectable } from '@nestjs/common';
import { parse, stringify, INode } from 'svgson';
import { Mod } from '../../mods/models/mod.model';
import path from 'path';
import fs from 'fs';
import rgb2hex from 'rgb2hex';
import { ProvincesService } from './provinces.service';

@Injectable()
export class MapsService {
  constructor(private provincesService: ProvincesService) {}

  async parseProvincesMap(mod: Mod) {
    const mapPath = path.resolve(mod.path, 'map', 'provinces.svg');
    const data = await fs.promises.readFile(mapPath);
    return parse(data.toString());
  }

  async test(mod: Mod) {
    const provinces = await this.provincesService.findAll(mod);
    const map = await this.parseProvincesMap(mod);

    const nodesMap = new Map<string, INode[]>();
    map.children.forEach((node) => {
      // fill:#3910f4; stroke:none;
      const style = node.attributes['style'];
      const entries = style.split(';').map((prop) => {
        const [name, value] = prop.split(':');
        return [name, value];
      });
      const styles = Object.fromEntries(entries);

      if (!nodesMap.has(styles['fill'])) {
        nodesMap.set(styles['fill'], []);
      }

      const nodes = nodesMap.get(styles['fill']);
      nodesMap.set(styles['fill'], [...nodes, node]);
    });

    //console.log('nodesMap', nodesMap);
    console.log('nodesMap', nodesMap.size);
    console.log('nodesMap', provinces.length);
    //
    provinces.map((p) => {
      const hex = rgb2hex(`rgb(${[p.red, p.green, p.blue].join()})`).hex;
      const nodes = nodesMap.get(`${hex}`);
      //console.log('`#${hex}`', `#${hex}`)

      if (p.type !== 'land') {
        // const xxx = nodes.map((n) => {
        //   n.attributes['style'] = `fill:black; stroke:none;`;
        //   return n;
        // });
        nodesMap.delete(hex);
      } else {
        if (!nodes) {
          console.log(nodes, p);
        } else {
          nodes.forEach((n) => {
            n.attributes['style'] = `fill:#e0e0e0; stroke:white;`;
            // nodesMap.set(`${hex}`, n);
          });
        }
      }
    });

    console.log('map.children', map.children.length);
    console.log('map.children', Array.from(nodesMap.values()).flat().length);

    map.children = Array.from(nodesMap.values()).flat();
    const u = stringify(map);

    await fs.promises.writeFile('test.svg', u);
  }
}
