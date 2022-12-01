import { GraphQLObjectType } from 'graphql';

import { getChefs } from './chef/getChefs';

export const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    getChefs,
  },
});
