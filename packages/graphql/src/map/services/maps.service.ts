import { Injectable } from '@nestjs/common';
import { stringify, INode, parse } from 'svgson';
import { Mod } from '../../mods/models/mod.model';
import path from 'path';
import { ProvincesService } from './provinces.service';
import { SvgService } from './svg.service';
import { StatesService } from '../../states/services/states.service';
import { State } from '../../states/models';
import { Province } from '../models';
import SVGPathCommander from 'svg-path-commander';

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
    private statesService: StatesService,
    private svgService: SvgService,
  ) {}

  async test(mod: Mod) {
    // const mapPath = path.resolve(
    //   __dirname,
    //   '..',
    //   '..',
    //   '..',
    //   'client',
    //   'maps',
    //   'map.svg',
    // );
    // const mapPath = path.resolve(__dirname, '../../', 'o2.svg');
    // const statesMap = await this.statesService.findAllAsMap(mod);
    // const svg = await this.svgService.readSvgFile(mapPath);
    // const map = this.createProvincesMap(svg);
    //
    // const provincesMap = await this.provincesService.findAllAsMap(mod);
    //
    // console.log('map', map.size);
    // console.log('provincesMap', provincesMap.size);
    //
    // const stateProvincesMap = new Map<State['stateId'], Province[]>();
    //
    // for (const state of Array.from(statesMap.values())) {
    //   state.provinces.map(({ provinceId }) => {
    //     if (!stateProvincesMap.has(state.stateId)) {
    //       stateProvincesMap.set(state.stateId, []);
    //     }
    //     const province = provincesMap.get(provinceId);
    //     const stateProvinces = stateProvincesMap.get(state.stateId);
    //     stateProvincesMap.set(state.stateId, [...stateProvinces, province]);
    //   });
    // }
    //
    // console.log('stateProvincesMap', stateProvincesMap.size);
    // console.log(
    //   'stateProvincesMapVVV',
    //   Array.from(stateProvincesMap.values()).flat().length,
    // );
    //
    // const stateNodesMap = new Map<State['stateId'], INode>();
    //
    // for (const state of Array.from(statesMap.values())) {
    //   const stateProvinces = stateProvincesMap.get(state.stateId);
    //   stateProvinces.forEach((province) => {
    //     const node = map.get(province.colorHex);
    //     if (!node) {
    //       return;
    //     }
    //     const n = stateNodesMap.get(state.stateId);
    //     if (!n) {
    //       stateNodesMap.set(state.stateId, node);
    //     } else {
    //       //console.log('attributes', n);
    //       node.attributes['d'] = n.attributes['d'] + ' ' + node.attributes['d'];
    //       stateNodesMap.set(state.stateId, node);
    //     }
    //   });
    // }
    //
    // const locations = Array.from(stateNodesMap).map(([id, node]) => {
    //   const state = statesMap.get(id);
    //   return {
    //     id,
    //     name: state.history.owner,
    //     path: node.attributes['d'],
    //   };
    // });

    //console.log('locations', locations);
    return [];
  }
}
