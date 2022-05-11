import { Module } from '@nestjs/common';
import { IdeologiesResolver } from './resolvers/ideologies.resolver';
import { IdeologiesService } from './services/ideologies.service';

@Module({
  providers: [IdeologiesResolver, IdeologiesService],
})
export class IdeologiesModule {}
