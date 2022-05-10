import { Module } from '@nestjs/common';
import { ResourcesResolver } from './resolvers/resources.resolver';
import { ResourcesService } from './services/resources.service';

@Module({
  providers: [ResourcesResolver, ResourcesService],
  exports: [ResourcesService],
})
export class ResourcesModule {}
