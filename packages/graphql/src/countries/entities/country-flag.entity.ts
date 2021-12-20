import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Mod } from '../../mods/entities/mod.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('country_flags')
export class CountryFlag {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  @Field()
  readonly tag: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  readonly variant: string | null;

  @Field()
  readonly url: string;

  @Column()
  readonly sha256: string;

  @ManyToOne(() => Mod, (mod) => mod.countryFlags, { onDelete: 'CASCADE' })
  readonly mod: Mod;
}
