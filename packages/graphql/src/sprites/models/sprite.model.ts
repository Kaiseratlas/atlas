import { Column, Entity, ManyToOne } from 'typeorm';
import { Mod } from '../../mods/models/mod.model';
import { BaseEntity } from '../../shared/models/base-entity.model';
import { Expose } from 'class-transformer';

@Entity('sprites')
export class Sprite extends BaseEntity {
  @Column()
  readonly name: string;

  @Column({ nullable: true })
  @Expose({ name: 'texturefile', groups: ['parsing'] })
  readonly textureFile: string;

  @Column({ nullable: true })
  readonly textureHash: string;

  @Column({ nullable: true })
  readonly effectFile: string;

  @Column({ type: 'numeric', nullable: true })
  readonly noOfFrames: number;

  @Column({ nullable: true })
  @Expose({ name: 'allwaystransparent', groups: ['parsing'] })
  readonly allWaysTransparent: boolean;

  @Column({ nullable: true })
  @Expose({ name: 'legacy_lazy_load', groups: ['parsing'] })
  readonly legacyLazyLoad: boolean;

  @Column({ nullable: true })
  @Expose({ name: 'transparencecheck', groups: ['parsing'] })
  readonly transparenceCheck: boolean;

  @ManyToOne(() => Mod, (mod) => mod.sprites, { onDelete: 'CASCADE' })
  readonly mod: Mod;
}
