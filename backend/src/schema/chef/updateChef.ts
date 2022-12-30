import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import { Context } from '../../server/Context';
import { ChefMutationResult } from './ChefMutationResult';
import { ChefResultType } from './ChefResultType';

type ResolveArgs = {
  id: string;
  input: {
    name: string;
    skill: number;
  };
};

const InputUpdateChefType = new GraphQLInputObjectType({
  name: 'UpdateChefInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    skill: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

export const updateChef = {
  type: ChefResultType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    input: { type: new GraphQLNonNull(InputUpdateChefType) },
  },
  resolve: async (
    _: unknown,
    { id, input }: ResolveArgs,
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

    const chef = await prisma.chef.findUnique({ where: { id } });

    if (chef === null) {
      return {
        chef: null,
        errors: [{ message: `Chef with id "${id}" not found` }],
      };
    }

    const updatedChef = await prisma.chef.update({
      where: { id },
      data: {
        name,
        skill,
      },
    });

    return {
      chef: updatedChef,
      errors: [],
    };
  },
};
