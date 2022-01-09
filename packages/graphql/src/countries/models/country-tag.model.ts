import { Column, Entity, ManyToOne } from 'typeorm';
import { Mod } from '../../mods/models/mod.model';
import { BaseEntity } from '../../shared/models/base-entity.model';

@Entity('country_tags')
export class CountryTag extends BaseEntity {
  @Column()
  readonly tag: string;

  @ManyToOne(() => Mod, (mod) => mod.countryTags, { onDelete: 'CASCADE' })
  readonly mod: Mod;
}
