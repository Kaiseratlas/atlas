import { registerEnumType } from '@nestjs/graphql';

export enum ProvinceType {
  LAND = 'land',
  SEA = 'sea',
  LAKE = 'lake',
}

registerEnumType(ProvinceType, {
  name: 'ProvinceType',
});
