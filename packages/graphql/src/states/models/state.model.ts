import {
  Column,
  DeepPartial,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Mod } from '../../mods/models/mod.model';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../shared/models/base-entity.model';
import { StateHistory } from './state-history.model';
import { StateProvince } from './state-province.model';
import { Expose, Transform, Type } from 'class-transformer';
import { convertToArray } from '../../parser/services/parser.service';

@ObjectType()
@Entity('states')
export class State extends BaseEntity {
  @Field(() => ID, { name: 'id' })
  @Column('numeric')
  @Expose({ name: 'id', groups: ['parsing'] })
  readonly stateId: number;

  @Column()
  @Field()
  readonly name: string;

  @Column()
  @Expose({ name: 'state_category', groups: ['parsing'] })
  readonly categoryId: string;

  @Column({ type: 'numeric', default: 0 })
  @Field(() => Int)
  readonly manpower: number;

  @OneToOne(() => StateHistory, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  @Field(() => StateHistory)
  @Type(() => StateHistory)
  readonly history: StateHistory;

  @OneToMany(() => StateProvince, (stateProvince) => stateProvince.state, {
    cascade: true,
    eager: true,
  })
  @Field(() => [ID])
  @Transform(
    ({ value }) =>
      convertToArray(value).map<DeepPartial<StateProvince>>((provinceId) => ({
        provinceId,
      })),
    { groups: ['parsing'] },
  )
  readonly provinces: StateProvince[];

  @ManyToOne(() => Mod, (mod) => mod.states, { onDelete: 'CASCADE' })
  readonly mod: Mod;
}
