import { Module } from '@nestjs/common';
import { ResourcesResolver } from './resolvers/resources.resolver';

@Module({
  providers: [ResourcesResolver],
})
export class ResourcesModule {}
