import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Mod } from '../../mods/entities/mod.entity';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('states')
export class State {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field(() => ID, { name: 'id' })
  @Column('numeric')
  readonly stateId: number;

  @Column()
  readonly name: string;

  @Field()
  readonly localizedName: string;

  @Column({ type: 'numeric', default: 0 })
  @Field(() => Int)
  readonly manpower: number;

  @CreateDateColumn()
  readonly createdAt: string;

  @UpdateDateColumn()
  readonly updatedAt: string;

  @ManyToOne(() => Mod, (mod) => mod.states, { onDelete: 'CASCADE' })
  readonly mod: Mod;
}
