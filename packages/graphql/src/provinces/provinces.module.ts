import { Module } from '@nestjs/common';
import { ProvincesResolver } from './resolvers/provinces.resolver';
import { ColorScalar } from '../shared/scalars/color.scalar';
import { ProvincesService } from './services/provinces.service';

@Module({
  providers: [ProvincesResolver, ColorScalar, ProvincesService],
  exports: [ProvincesService],
})
export class ProvincesModule {}
