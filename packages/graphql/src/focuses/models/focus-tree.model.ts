import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Expose, Transform, Type } from 'class-transformer';
import { Mod } from '../../mods/models/mod.model';
import { convertToArray } from '../../parser/services/parser.service';
import { Focus } from './focus.model';
import { BaseEntity } from '../../shared/models/base-entity.model';

@Entity('focus_trees')
@ObjectType()
export class FocusTree extends BaseEntity {
  @Field(() => ID, {
    name: 'id',
    description:
      'Focus tree id, which can be used to load a focus tree during the game.',
  })
  @Column({ default: false })
  @Expose({ name: 'id', groups: ['parsing'] })
  readonly treeId: string;

  @Column({ default: false })
  @Expose({ name: 'reset_on_civil_war', groups: ['parsing'] })
  readonly resetOnCivilWar: boolean;

  @ManyToOne(() => Mod, (mod) => mod.events, { onDelete: 'CASCADE' })
  readonly mod: Mod;

  @OneToMany(() => Focus, (focus) => focus.tree, { cascade: true, eager: true })
  @Expose({ name: 'focus', groups: ['parsing'] })
  @Field(() => [Focus])
  @Transform(({ value }) => convertToArray(value), { groups: ['parsing'] })
  @Type(() => Focus)
  readonly focuses: Focus[];
}
