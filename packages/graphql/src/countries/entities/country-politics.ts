import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Ideology } from '../../ideologies/entities/ideology.entity';
import { Ideology as IdeologyModel } from '../../ideologies/models/ideology.model';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('country_politics')
export class CountryPolitics {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field(() => IdeologyModel)
  @ManyToOne(() => Ideology, { eager: true })
  rulingParty: Ideology;

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
