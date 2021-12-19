import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Mod } from '../../mods/entities/mod.entity';

@Entity('country_history')
export class CountryHistory {
  @PrimaryGeneratedColumn()
  readonly id: number;

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

  @ManyToOne(() => Mod, (mod) => mod.countryTags, { onDelete: 'CASCADE' })
  readonly mod: Mod;
}
