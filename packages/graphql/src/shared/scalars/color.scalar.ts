import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';
import { Color } from '@kaiseratlas/parser';

@Scalar('Color', () => Color)
export class ColorScalar implements CustomScalar<number[], Color> {
  description = 'Color scalar type';

  parseValue(value: string): Color {
    return Color.rgb(value);
  }

  serialize(color: Color): number[] {
    return color.rgb().array();
  }

  parseLiteral(ast: ValueNode): Color {
    if (ast.kind === Kind.INT) {
      return Color.rgb(ast.value);
    }
    return null;
  }
}
