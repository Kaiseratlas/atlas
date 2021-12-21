import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Mod } from '../../mods/models/mod.model';

@Entity('country_tags')
export class CountryTag {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly tag: string;

  @ManyToOne(() => Mod, (mod) => mod.countryTags, { onDelete: 'CASCADE' })
  readonly mod: Mod;
}
