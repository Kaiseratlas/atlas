import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ProductVersion } from './product-version.model';

@Entity('products')
@ObjectType()
export class Product {
  static readonly Version = ProductVersion;
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;
  @Field(() => ID, { name: 'id' })
  @Column({ unique: true })
  readonly alias: string;
  @Field()
  @Column()
  readonly title: string;
  @Field()
  @Column()
  readonly description: string;
  @Field()
  @Column()
  readonly logoUrl: string;
  @CreateDateColumn()
  readonly createdAt: Date;
  @UpdateDateColumn()
  readonly updatedAt: Date;

  @OneToMany(() => ProductVersion, (productVersion) => productVersion.product, {
    cascade: true,
    eager: true,
  })
  readonly versions: ProductVersion[];
}
