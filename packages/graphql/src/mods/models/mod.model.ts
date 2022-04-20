import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('mods')
export class Mod {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;
  @Column()
  readonly path: string;
  @CreateDateColumn()
  readonly createdAt: Date;
  @UpdateDateColumn()
  readonly updatedAt: Date;
}
