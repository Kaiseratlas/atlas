import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Mod } from '../../mods/entities/mod.entity';

@Entity('states')
export class State {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column('numeric')
  readonly stateId: number;

  @Column()
  readonly name: string;

  @Column({ type: 'numeric', default: 0 })
  readonly manpower: number;

  @CreateDateColumn()
  readonly createdAt: string;

  @UpdateDateColumn()
  readonly updatedAt: string;

  @ManyToOne(() => Mod, (mod) => mod.states, { onDelete: 'CASCADE' })
  readonly mod: Mod;
}
