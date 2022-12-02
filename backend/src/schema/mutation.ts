import { GraphQLObjectType } from 'graphql';

import { createChef } from './chef/createChef';
import { deleteChef } from './chef/deleteChef';
import { updateChef } from './chef/updateChef';

export const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createChef,
    deleteChef,
    updateChef,
  },
});
