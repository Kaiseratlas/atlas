import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Mod } from '../../mods/models/mod.model';

@ObjectType({ description: 'https://hoi4.paradoxwikis.com/Ideology_modding' })
@Entity('ideologies')
export class Ideology {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  readonly id: number | string;

  @Field()
  @Column()
  readonly name: string;

  @Field()
  readonly grouping?: string;

  @Field()
  readonly description: string;

  @Field({
    description:
      'RGB ideology colour, used in the political pie chart or next to the chart.',
  })
  @Column()
  readonly color: string;

  @Field(() => Boolean, {
    nullable: true,
    description:
      'Can you boost this ideologies popularity in another country (yes/no)',
  })
  readonly canBeBoosted?: boolean;

  @Field(() => Boolean, {
    nullable: true,
  })
  readonly canCollaborate?: boolean;

  @CreateDateColumn()
  readonly createdAt: string;

  @UpdateDateColumn()
  readonly updatedAt: string;

  @ManyToOne(() => Mod, (mod) => mod.countryTags, { onDelete: 'CASCADE' })
  readonly mod: Mod;
}
