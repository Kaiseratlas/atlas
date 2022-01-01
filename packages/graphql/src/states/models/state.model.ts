import { Column, Entity, ManyToOne } from 'typeorm';
import { Mod } from '../../mods/models/mod.model';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../shared/models/base-entity.model';

@ObjectType()
@Entity('states')
export class State extends BaseEntity {
  @Field(() => ID, { name: 'id' })
  @Column('numeric')
  readonly stateId: number;

  @Column()
  readonly name: string;

  @Field()
  readonly localizedName: string;

  @Column({ type: 'numeric', default: 0 })
  @Field(() => Int)
  readonly manpower: number;

  @ManyToOne(() => Mod, (mod) => mod.states, { onDelete: 'CASCADE' })
  readonly mod: Mod;
}
