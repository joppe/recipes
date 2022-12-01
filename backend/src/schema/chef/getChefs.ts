import { GraphQLList } from 'graphql';

import { Chef } from '../../types/Chef';
import { chef } from './chef';

export const getChefs = {
  type: new GraphQLList(chef),
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
