import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import { Chef } from '../../types/Chef';
import { ChefType } from './ChefType';

type ResolveArgs = {
  input: {
    name: string;
    skill: number;
  };
};

const inputCreateChefType = new GraphQLInputObjectType({
  name: 'CreateChefInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    skill: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

export const createChef = {
  type: ChefType,
  args: {
    input: { type: inputCreateChefType },
  },
  resolve: (_: unknown, { input }: ResolveArgs): Chef => {
    const { name, skill } = input;

    return {
      id: String(Math.random()),
      name,
      skill,
      media: null,
      meals: [],
    };
  },
};
