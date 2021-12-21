import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('country_politics')
export class CountryPolitics {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Column({ nullable: true })
  ideologyName: string;

  @Field()
  @Column({ type: 'datetime', nullable: true })
  lastElection: Date;

  @Field(() => Int, { nullable: true })
  @Column({ type: 'numeric', nullable: true })
  electionFrequency: string;

  @Field(() => Boolean, { nullable: true })
  @Column({ type: 'boolean', nullable: true })
  electionsAllowed: boolean;
}
