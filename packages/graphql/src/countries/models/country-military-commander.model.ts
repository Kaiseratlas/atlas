import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, Int, InterfaceType } from '@nestjs/graphql';

@InterfaceType()
export abstract class CountryMilitaryCommander {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ type: 'numeric', nullable: true })
  @Field(() => ID, { nullable: true })
  readonly commanderId: number;

  @Column()
  @Field()
  readonly name: string;

  @Field({ nullable: true })
  readonly portraitUrl: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  readonly description: string;

  @Column({ nullable: true })
  readonly portraitPath: string;

  @Column({ nullable: true })
  readonly pictureHash: string;

  @Column({ type: 'numeric', default: 0 })
  @Field(() => Int)
  readonly skill: number;

  @Column({ type: 'numeric', default: 0 })
  @Field(() => Int)
  readonly attackSkill: number;

  @Column({ type: 'numeric', default: 0 })
  @Field(() => Int)
  readonly defenseSkill: number;

  @CreateDateColumn()
  readonly createdAt: string;

  @UpdateDateColumn()
  readonly updatedAt: string;
}
