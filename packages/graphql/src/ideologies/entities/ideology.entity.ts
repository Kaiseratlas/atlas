import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Mod } from '../../mods/entities/mod.entity';

@Entity('ideologies')
export class Ideology {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly name: string;

  @Column()
  readonly color: string;

  @CreateDateColumn()
  readonly createdAt: string;

  @UpdateDateColumn()
  readonly updatedAt: string;

  @ManyToOne(() => Mod, (mod) => mod.countryTags, { onDelete: 'CASCADE' })
  readonly mod: Mod;
}
