import { Column, Entity, ManyToOne } from 'typeorm';
import { Focus } from './focus.model';
import { Expose } from 'class-transformer';
import { BaseEntity } from '../../shared/models/base-entity.model';

@Entity('focus_prerequisite')
export class FocusPrerequisite extends BaseEntity {
  @Column({ nullable: true })
  @Expose({ name: 'focus', groups: ['parsing'] })
  readonly prerequisiteId: string;

  @ManyToOne(() => Focus, (focus) => focus.prerequisite, {
    onDelete: 'CASCADE',
  })
  readonly focus: Focus;
}
