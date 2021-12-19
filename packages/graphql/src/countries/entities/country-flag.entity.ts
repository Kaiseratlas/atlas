import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Mod } from '../../mods/entities/mod.entity';

@Entity('country_flags')
export class CountryFlag {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly tag: string;

  @Column({ nullable: true })
  readonly variant: string | null;

  @Column()
  readonly sha256: string;

  @ManyToOne(() => Mod, (mod) => mod.countryFlags, { onDelete: 'CASCADE' })
  readonly mod: Mod;
}
