import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CountryHistory } from './country-history.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { Ideology } from '../../ideologies/models/ideology.model';

@ObjectType()
@Entity('country_leaders')
export class CountryLeader {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  @Field()
  readonly name: string;

  @Column({ nullable: true })
  readonly picture: string;

  @Column({ nullable: true })
  readonly pictureHash: string;

  @Field()
  readonly pictureUrl: string;

  @Column({ type: 'datetime', nullable: true })
  @Field()
  readonly expire: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  readonly description: string;

  @Column()
  readonly ideologyName: string;

  @Field(() => Ideology)
  readonly ideology: Ideology;

  @CreateDateColumn()
  readonly createdAt: string;

  @UpdateDateColumn()
  readonly updatedAt: string;

  @ManyToOne(() => CountryHistory, (countryHistory) => countryHistory.leaders, {
    onDelete: 'CASCADE',
  })
  readonly history: CountryHistory;
}
