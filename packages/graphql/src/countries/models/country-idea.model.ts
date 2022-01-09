import { Column, Entity, ManyToOne } from 'typeorm';
import { CountryHistory } from './country-history.model';
import { BaseEntity } from '../../shared/models/base-entity.model';

@Entity('country_ideas')
export class CountryIdea extends BaseEntity {
  @Column()
  readonly ideaName: string;

  @ManyToOne(() => CountryHistory, (countryHistory) => countryHistory.ideas, {
    onDelete: 'CASCADE',
  })
  readonly history: CountryHistory;
}
