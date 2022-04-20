import { Module } from '@nestjs/common';
import { AbilitiesResolver } from './resolvers/abilities.resolver';

@Module({
  providers: [AbilitiesResolver],
})
export class AbilitiesModule {}
