import { Module } from '@nestjs/common';
import { ProvincesResolver } from './resolvers/provinces.resolver';
import { ColorScalar } from '../shared/scalars/color.scalar';

@Module({
  providers: [ProvincesResolver, ColorScalar],
})
export class ProvincesModule {}
