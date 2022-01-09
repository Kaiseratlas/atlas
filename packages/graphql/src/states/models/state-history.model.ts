import { Column, DeepPartial, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../shared/models/base-entity.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { StateCore } from './state-core.model';
import { StateClaim } from './state-claim.model';
import { Expose, Transform } from 'class-transformer';
import { convertToArray } from '../../parser/services/parser.service';
import { Country } from '../../countries/models/country.model';
import { StateVictoryPoints } from './state-victory-points.model';

@Entity('state_history')
@ObjectType()
export class StateHistory extends BaseEntity {
  @Column()
  @Field({ name: 'ownerTag' })
  readonly owner: string;

  @Field(() => Country, { name: 'owner' })
  readonly ownerCountry: Country;

  @OneToMany(
    () => StateVictoryPoints,
    (stateVictoryPoints) => stateVictoryPoints.history,
    {
      cascade: true,
      eager: true,
      nullable: true,
    },
  )
  @Expose({ name: 'victory_points', groups: ['parsing'] })
  @Field(() => [StateVictoryPoints])
  @Transform(
    ({ value }) => {
      if (!value) {
        return null;
      }
      if (Array.isArray(value[0])) {
        return value.map(([provinceId, value]) => ({ provinceId, value }));
      }
      const [provinceId, points] = value;
      return [{ provinceId, value: points }];
    },
    { groups: ['parsing'] },
  )
  readonly victoryPoints: StateVictoryPoints[];

  get capitalVictoryPoints(): StateVictoryPoints | null {
    if (!this.victoryPoints) {
      return null;
    }

    return this.victoryPoints.reduce((prev, current) =>
      prev.value > current.value ? prev : current,
    );
  }

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
