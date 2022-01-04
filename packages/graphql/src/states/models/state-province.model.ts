import { BaseEntity } from '../../shared/models/base-entity.model';
import { Column, Entity, ManyToOne } from 'typeorm';
import { State } from './state.model';

@Entity('state_provinces')
export class StateProvince extends BaseEntity {
  @Column({ type: 'numeric' })
  readonly provinceId: number;

  @ManyToOne(() => State, (state) => state.provinces, { onDelete: 'CASCADE' })
  readonly state: State;
}
