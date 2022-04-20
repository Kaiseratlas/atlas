import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Product } from './product.model';
import { Game } from '../../games/models/game.model';

@Entity('product_versions')
@ObjectType()
export class ProductVersion {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  readonly id: string;
  @Column()
  @Field()
  readonly version: string;

  @CreateDateColumn()
  readonly createdAt: Date;
  @UpdateDateColumn()
  readonly updatedAt: Date;

  @ManyToOne(() => Product, (product) => product.versions, {
    onDelete: 'CASCADE',
  })
  readonly product: Product;

  @ManyToOne(() => Game, (game) => game.products, {
    onDelete: 'SET NULL',
    eager: true,
  })
  readonly game: Game;

  @Column('varchar', { array: true })
  readonly dependencies: string[];
}
