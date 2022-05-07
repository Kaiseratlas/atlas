import { Resolver } from '@nestjs/graphql';
import { ProductEntitiesResolver } from '../../shared/resolvers';
import { Division } from '../models/division.model';

@Resolver(() => Division.Template)
export class DivisionTemplatesResolver extends ProductEntitiesResolver(
  Division.Template,
  {
    plural: 'divisionTemplates',
  },
) {}
