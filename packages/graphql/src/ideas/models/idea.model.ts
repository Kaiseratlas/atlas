import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Mod } from '../../mods/models/mod.model';

@Entity('ideas')
export class Idea {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly name: string;

  @Column({ nullable: true })
  readonly picture: string;

  @Column({ nullable: true })
  readonly pictureHash: string;

  @Column()
  readonly slot: string;

  @CreateDateColumn()
  readonly createdAt: string;

  @UpdateDateColumn()
  readonly updatedAt: string;

  @ManyToOne(() => Mod, (mod) => mod.ideas, { onDelete: 'CASCADE' })
  readonly mod: Mod;
}
