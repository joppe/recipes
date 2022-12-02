import { GraphQLObjectType } from 'graphql';

import { chef } from './chef/chef';
import { chefs } from './chef/chefs';

export const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    chef,
    chefs,
  },
});
