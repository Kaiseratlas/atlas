import { Column, DeepPartial, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../shared/models/base-entity.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { StateCore } from './state-core.model';
import { StateClaim } from './state-claim.model';
import { Expose, Transform } from 'class-transformer';
import { convertToArray } from '../../parser/services/parser.service';
import { Country } from '../../countries/models/country.model';

@Entity('state_history')
@ObjectType()
export class StateHistory extends BaseEntity {
  @Column()
  @Field({ name: 'ownerTag' })
  readonly owner: string;

  @Field(() => Country, { name: 'owner' })
  readonly ownerCountry: Country;

  @OneToMany(() => StateCore, (stateCore) => stateCore.history, {
    cascade: true,
    eager: true,
  })
  @Expose({ name: 'add_core_of', groups: ['parsing'] })
  @Field(() => [String], { name: 'cores' })
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
  @Field(() => [String], { name: 'claims' })
  readonly addClaimBy: StateClaim[];
}
