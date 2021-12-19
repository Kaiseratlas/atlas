import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ideology } from './entities/ideology.entity';
import { IdeologiesResolver } from './resolvers/ideologies.resolver';
import { IdeologiesService } from './services/ideologies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ideology])],
  providers: [IdeologiesResolver, IdeologiesService],
})
export class IdeologiesModule {}
