import {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import { Context } from '../../server/Context';
import { ChefMutationResult } from './ChefMutationResult';
import { ChefResultType } from './ChefResultType';

type ResolveArgs = {
  input: {
    name: string;
    skill: number;
  };
};

const InputCreateChefType = new GraphQLInputObjectType({
  name: 'CreateChefInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    skill: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

export const createChef = {
  type: ChefResultType,
  args: {
    input: { type: new GraphQLNonNull(InputCreateChefType) },
  },
  resolve: async (
    _: unknown,
    { input }: ResolveArgs,
    { prisma, userInfo }: Context,
  ): Promise<ChefMutationResult> => {
    if (userInfo?.userId === undefined) {
      return {
        chef: null,
        errors: [
          { message: 'User must be logged in to be able to do this action' },
        ],
      };
    }

    const { name, skill } = input;

    const existingChef = await prisma.chef.findFirst({
      where: {
        name,
      },
    });

    if (existingChef !== null) {
      return {
        chef: null,
        errors: [{ message: 'There is already a chef with that name' }],
      };
    }

    const newChef = await prisma.chef.create({
      data: { name, skill },
    });

    return {
      chef: newChef,
      errors: [],
    };
  },
};
