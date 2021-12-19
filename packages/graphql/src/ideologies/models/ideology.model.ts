import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Entity } from 'typeorm';

@ObjectType({ description: 'https://hoi4.paradoxwikis.com/Ideology_modding' })
@Entity('ideologies')
export class Ideology {
  @Field(() => ID)
  readonly id: number;

  @Field()
  readonly name: string;

  @Field({
    description:
      'RGB ideology colour, used in the political pie chart or next to the chart.',
  })
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
}
