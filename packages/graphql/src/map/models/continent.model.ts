import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../shared/models/base-entity.model';
import { Field, ID } from '@nestjs/graphql';
import { Mod } from '../../mods/models/mod.model';

@Entity('map_continents')
export class Continent extends BaseEntity {
  @Column({ type: 'numeric' })
  @Field(() => ID, { name: 'id' })
  readonly continentId: number;

  @Field()
  @Column()
  readonly name: string;

  @ManyToOne(() => Mod, (mod) => mod.continents, { onDelete: 'CASCADE' })
  readonly mod: Mod;
}
