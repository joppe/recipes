import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import { Chef } from '../../types/Chef';
import { ChefType } from './ChefType';

type ResolveArgs = {
  id: string;
  input: {
    name: string;
    skill: number;
  };
};

const inputUpdateChefType = new GraphQLInputObjectType({
  name: 'UpdateChefInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    skill: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

export const updateChef = {
  type: ChefType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    input: { type: inputUpdateChefType },
  },
  resolve: (_: unknown, { input }: ResolveArgs): Chef => {
    const { name, skill } = input;

    return {
      id: String(Math.random()),
      name,
      skill,
    };
  },
};
