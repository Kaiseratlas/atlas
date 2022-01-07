import { BaseEntity } from '../../shared/models/base-entity.model';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Mod } from '../../mods/models/mod.model';

@Entity('country_colors')
export class CountryColor extends BaseEntity {
  @Column()
  readonly tag: string;

  @Column('numeric')
  readonly red: number;

  @Column('numeric')
  readonly green: number;

  @Column('numeric')
  readonly blue: number;

  @OneToOne(() => CountryColor, { cascade: true, eager: true })
  @JoinColumn()
  readonly ui: CountryColor;

  @ManyToOne(() => Mod, (mod) => mod.countryColors, { onDelete: 'CASCADE' })
  readonly mod: Mod;
}
