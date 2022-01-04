import { Column, DeepPartial, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../shared/models/base-entity.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { StateCore } from './state-core.model';
import { StateClaim } from './state-claim.model';
import { Expose, Transform } from 'class-transformer';
import { convertToArray } from '../../parser/services/parser.service';

@Entity('state_history')
@ObjectType()
export class StateHistory extends BaseEntity {
  @Column()
  readonly owner: string;

  @OneToMany(() => StateCore, (stateCore) => stateCore.history, {
    cascade: true,
    eager: true,
  })
  @Expose({ name: 'add_core_of', groups: ['parsing'] })
  @Field(() => [String])
  @Transform(
    ({ value }) =>
      convertToArray(value).map<DeepPartial<StateCore>>((tag) => ({ tag })),
    { groups: ['parsing'] },
  )
  readonly addCoreOf: StateCore[];

  @OneToMany(() => StateClaim, (stateClaim) => stateClaim.history, {
    cascade: true,
    eager: true,
  })
  @Expose({ name: 'add_claim_by', groups: ['parsing'] })
  @Transform(
    ({ value }) =>
      convertToArray(value).map<DeepPartial<StateClaim>>((tag) => ({ tag })),
    { groups: ['parsing'] },
  )
  @Field(() => [String])
  readonly addClaimBy: StateClaim[];
}
