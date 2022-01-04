import { Injectable } from '@nestjs/common';
import { stringify, INode, parse } from 'svgson';
import { Mod } from '../../mods/models/mod.model';
import path from 'path';
import { ProvincesService } from './provinces.service';
import { SvgService } from './svg.service';
import { StatesService } from '../../states/services/states.service';
import { State } from '../../states/models';
import { Province } from '../models';

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
    const states = await this.statesService.findAll(mod);
    const svg = await this.svgService.readSvgFile(mapPath);
    const map = this.createProvincesMap(svg);

    const provincesMap = new Map<Province['provinceId'], Province>();
    provinces.forEach((p) => provincesMap.set(p.provinceId, p));

    const statesMap = new Map<State['stateId'], State>();
    states.forEach((s) => statesMap.set(s.stateId, s));

    console.log('provinces', provinces.length);
    console.log('states', states.length);
    console.log('statesVVV', states.map((s) => s.provinces).flat().length);
    console.log('map', map.size);
    console.log('provincesMap', provincesMap.size);

    const stateProvincesMap = new Map<State['stateId'], Province[]>();

    for (const state of states) {
      state.provinces.map(({ provinceId }) => {
        if (!stateProvincesMap.has(state.stateId)) {
          stateProvincesMap.set(state.stateId, []);
        }
        const province = provincesMap.get(provinceId);
        const stateProvinces = stateProvincesMap.get(state.stateId);
        stateProvincesMap.set(state.stateId, [...stateProvinces, province]);
      });
    }

    console.log('stateProvincesMap', stateProvincesMap.size);
    console.log(
      'stateProvincesMapVVV',
      Array.from(stateProvincesMap.values()).flat().length,
    );

    const stateNodesMap = new Map<State['stateId'], INode>();

    for (const state of states) {
      const stateProvinces = stateProvincesMap.get(state.stateId);
      stateProvinces.forEach((province) => {
        const node = map.get(province.colorHex);
        if (!node) {
          return;
        }
        const n = stateNodesMap.get(state.stateId);
        if (!n) {
          stateNodesMap.set(state.stateId, node);
        } else {
          //console.log('attributes', n);
          node.attributes['d'] = n.attributes['d'] + ' ' + node.attributes['d'];
          stateNodesMap.set(state.stateId, node);
        }
      });
    }

    const locations = Array.from(stateNodesMap).map(([id, node]) => {
      const state = statesMap.get(id);
      return {
        id,
        name: state.history.owner,
        path: node.attributes['d'],
      };
    });

    //console.log('locations', locations);
    return locations;
  }

  async test2(mod: Mod) {
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
