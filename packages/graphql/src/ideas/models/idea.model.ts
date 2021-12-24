import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Mod } from '../../mods/models/mod.model';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity('ideas')
@ObjectType()
export class Idea {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  readonly id: number;

  @Column()
  @Field()
  readonly name: string;

  @Column({ nullable: true })
  readonly picture: string;

  @Field({ nullable: true })
  readonly pictureUrl: string;

  @Column({ nullable: true })
  readonly pictureHash: string;

  @Column()
  @Field()
  readonly slot: string;

  @CreateDateColumn()
  readonly createdAt: string;

  @UpdateDateColumn()
  readonly updatedAt: string;

  @ManyToOne(() => Mod, (mod) => mod.ideas, { onDelete: 'CASCADE' })
  readonly mod: Mod;
}
