import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Mod } from '../../mods/entities/mod.entity';
import { CountryPolitics } from './country-politics';

@Entity('country_history')
export class CountryHistory {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly tag: string;

  @Column('numeric')
  readonly capitalId: number;

  @Column('numeric', { default: 0 })
  readonly researchSlots: number;

  @Column('numeric', { default: 0 })
  readonly stability: number;

  @Column('numeric', { default: 0 })
  readonly warSupport: number;

  @Column('numeric', { default: 0 })
  readonly politicalPower: number;

  @Column('numeric', { default: 0 })
  readonly convoys: number;

  @CreateDateColumn()
  readonly createdAt: string;

  @UpdateDateColumn()
  readonly updatedAt: string;

  @OneToOne(() => CountryPolitics, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  readonly politics: CountryPolitics;

  @ManyToOne(() => Mod, (mod) => mod.countryHistory, { onDelete: 'CASCADE' })
  readonly mod: Mod;
}
