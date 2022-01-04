import { BaseEntity } from '../../shared/models/base-entity.model';
import { Field, ID, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ProvinceType } from '../enums/province-type.enum';
import { Mod } from '../../mods/models/mod.model';
import rgb2hex from 'rgb2hex';

@Entity('map_provinces')
export class Province extends BaseEntity {
  @Field(() => ID, { name: 'id' })
  @Column({ type: 'numeric' })
  readonly provinceId: number;

  get colorHex(): string {
    return rgb2hex(`rgb(${[this.red, this.green, this.blue].join()})`).hex;
  }

  @Field(() => Int)
  @Column({ type: 'numeric' })
  readonly red: number;

  @Field(() => Int)
  @Column({ type: 'numeric' })
  readonly green: number;

  @Field(() => Int)
  @Column({ type: 'numeric' })
  readonly blue: number;

  @Column({ enum: Province, enumName: 'province_type' })
  readonly type: ProvinceType;

  @Field(() => Boolean)
  @Column({ type: 'boolean' })
  readonly coastal: boolean;

  @Field()
  @Column()
  readonly terrain: string;

  @Field(() => Int)
  @Column({ type: 'numeric' })
  readonly continentId: number;

  @ManyToOne(() => Mod, (mod) => mod.provinces, { onDelete: 'CASCADE' })
  readonly mod: Mod;
}
