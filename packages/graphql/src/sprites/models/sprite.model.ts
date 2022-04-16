import * as Parser from '@kaiseratlas/parser';
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Sprite extends Parser.Sprite {
  @Field(() => ID)
  readonly id: string;
  @Field({ nullable: true }) // TODO: !
  readonly textureFile: string;
  @Field(() => Int, { defaultValue: 0 })
  readonly noOfFrames: number;
}
