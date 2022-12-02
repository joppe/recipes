import { GraphQLID, GraphQLNonNull } from 'graphql';

import { Chef } from '../../types/Chef';
import { ChefType } from './ChefType';

type ResolveArgs = {
  id: string;
};

export const deleteChef = {
  type: ChefType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  resolve: (_: unknown, { id }: ResolveArgs): Chef => {
    return {
      id,
      name: 'test',
      skill: 0,
      media: null,
      meals: [],
    };
  },
};
