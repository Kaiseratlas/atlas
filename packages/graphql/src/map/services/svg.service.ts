import { Injectable } from '@nestjs/common';
import fs from 'fs';
import { INode, parse, stringify } from 'svgson';
import SVGPathCommander from 'svg-path-commander';
import { optimize } from 'svgo';

function parseNodeStyle(node: INode): Record<string, string> {
  const style = node.attributes?.['style'] ?? '';
  const entries = style.split(';').map((prop) => {
    const [name, value] = prop.split(':');
    return [name, value];
  });
  return Object.fromEntries(entries);
}

@Injectable()
export class SvgService {
  async readSvgFile(filepath: string): Promise<INode> {
    const data = await fs.promises.readFile(filepath);
    return parse(data.toString());
  }

  async readSvgFile2(filepath: string): Promise<INode> {
    const data = await fs.promises.readFile(filepath);
    console.log('data', data.toString().length);
    // const o = optimize(data);
    // console.log('o', o.data.toString().length);
    // await fs.promises.writeFile('o.svg', o.data);
    const svg = await parse(data.toString());

    const nodesMap = new Map();

    svg.children.forEach((node) => {
      const style = parseNodeStyle(node);
      const colorHex = style['fill'];
      const n = nodesMap.get(colorHex);
      node.attributes['style'] = `fill:${colorHex};`;
      if (!n) {
        nodesMap.set(colorHex, node);
      } else {
        node.attributes['d'] = n.attributes['d'] + ' ' + node.attributes['d'];
        nodesMap.set(colorHex, node);
      }
    });

    svg.children = Array.from(nodesMap.values()).map((path) => {
      return {
        ...path,
        attributes: {
          ...path.attributes,
          d: new SVGPathCommander(path.attributes['d'], { round: 'auto' })
            .optimize()
            .toString(),
        },
      };
    });

    const xxx = optimize(stringify(svg), {  });

    await fs.promises.writeFile('o2.svg', xxx.data);

    return svg;
  }
}
