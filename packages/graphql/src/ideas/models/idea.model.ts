import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Mod } from '../../mods/models/mod.model';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../shared/models/base-entity.model';

@Entity('ideas')
@ObjectType()
export class Idea extends BaseEntity {
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

  @ManyToOne(() => Mod, (mod) => mod.ideas, { onDelete: 'CASCADE' })
  readonly mod: Mod;
}
