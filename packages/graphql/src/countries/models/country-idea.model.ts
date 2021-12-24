import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CountryHistory } from './country-history.model';

@Entity('country_ideas')
export class CountryIdea {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly ideaName: string;

  @ManyToOne(() => CountryHistory, (countryHistory) => countryHistory.ideas, {
    onDelete: 'CASCADE',
  })
  readonly history: CountryHistory;

  @CreateDateColumn()
  readonly createdAt: string;

  @UpdateDateColumn()
  readonly updatedAt: string;
}
