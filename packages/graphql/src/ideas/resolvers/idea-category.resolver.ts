import { Resolver } from '@nestjs/graphql';
import { ProductEntitiesResolver } from '../../shared/resolvers';
import { Idea } from '../models/idea.model';

@Resolver(() => Idea.Category)
export class IdeaCategoryResolver extends ProductEntitiesResolver(
  Idea.Category,
  {
    plural: 'ideaCategories',
  },
) {}
