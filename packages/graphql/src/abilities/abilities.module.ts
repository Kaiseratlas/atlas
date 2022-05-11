import { Module } from '@nestjs/common';
import { AbilitiesResolver } from './resolvers/abilities.resolver';
import { AbilitiesService } from './services/abilities.service';

@Module({
  providers: [AbilitiesResolver, AbilitiesService],
  exports: [AbilitiesService],
})
export class AbilitiesModule {}
