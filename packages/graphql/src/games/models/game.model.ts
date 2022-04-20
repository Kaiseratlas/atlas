import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as Parser from '@kaiseratlas/parser';
import { ProductVersion } from '../../products/models/product-version.model';

@Entity('games')
export class Game extends Parser.Game {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;
  @Column()
  readonly version: string;
  @Column()
  readonly path: string;
  @Column({ nullable: true })
  readonly customModPath: string;
  @CreateDateColumn()
  readonly createdAt: Date;
  @UpdateDateColumn()
  readonly updatedAt: Date;

  @OneToMany(() => ProductVersion, (productVersion) => productVersion.game)
  readonly products: ProductVersion[];
}
