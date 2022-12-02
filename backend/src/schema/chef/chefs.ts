import { GraphQLList } from 'graphql';

import { Chef } from '../../types/Chef';
import { ChefType } from './ChefType';

export const chefs = {
  type: new GraphQLList(ChefType),
  resolve: (): Chef[] => {
    return [
      {
        id: '123',
        name: 'Joppe',
        skill: 5,
      },
    ];
  },
};
