import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Ideology } from '../../ideologies/entities/ideology.entity';

@Entity('country_politics')
export class CountryPolitics {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ManyToOne(() => Ideology, { eager: true })
  rulingParty: Ideology;

  @Column({ type: 'datetime', nullable: true })
  lastElection: Date;

  @Column({ type: 'numeric', nullable: true })
  electionFrequency: string;

  @Column({ type: 'boolean', nullable: true })
  electionsAllowed: boolean;
}
