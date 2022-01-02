import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Expose, Transform, Type } from 'class-transformer';
import { convertToArray } from '../../parser/services/parser.service';
import { FocusTree } from './focus-tree.model';
import { FocusPrerequisite } from './focus-prerequisite.model';
import { BaseEntity } from '../../shared/models/base-entity.model';

@Entity('focuses')
@ObjectType()
export class Focus extends BaseEntity {
  @Expose({ name: 'id', groups: ['parsing'] })
  @Field(() => ID, { name: 'id' })
  @Column({ nullable: true })
  readonly focusId: string;

  @Field()
  readonly title: string;

  @Field()
  readonly description: string;

  @Column()
  readonly icon: string;

  @Field({ nullable: true })
  readonly iconUrl: string;

  @Column({ type: 'numeric' })
  @Field(() => Int)
  readonly cost: number;

  @Expose({ name: 'relative_position_id', groups: ['parsing'] })
  @Column({ nullable: true })
  @Field(() => ID, { nullable: true })
  readonly relativePositionId: string;

  @Column({ type: 'numeric' })
  @Field(() => Int)
  readonly x: number;

  @Column({ type: 'numeric' })
  @Field(() => Int)
  readonly y: number;

  @OneToMany(() => FocusPrerequisite, (prerequisite) => prerequisite.focus, {
    cascade: true,
    eager: true,
  })
  @Expose({ name: 'prerequisite', groups: ['parsing'] })
  @Transform(({ value }) => convertToArray(value), {
    groups: ['parsing'],
  })
  @Type(() => FocusPrerequisite)
  @Field(() => [ID])
  readonly prerequisite: FocusPrerequisite[];

  @ManyToOne(() => FocusTree, (tree) => tree.focuses, { onDelete: 'CASCADE' })
  readonly tree: FocusTree;
}
