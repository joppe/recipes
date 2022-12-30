import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

import { Context } from '../../server/Context';
import { UnitMutationResult } from './UnitMutationResult';
import { UnitResultType } from './UnitResultType';

type ResolveArgs = {
  input: {
    name: string;
    abbreviation: string;
  };
};

const InputCreateUnitType = new GraphQLInputObjectType({
  name: 'CreateUnitInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    abbreviation: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export const createUnit = {
  type: UnitResultType,
  args: {
    input: { type: InputCreateUnitType },
  },
  resolve: async (
    _: unknown,
    { input }: ResolveArgs,
    { prisma, userInfo }: Context,
  ): Promise<UnitMutationResult> => {
    if (userInfo?.userId === undefined) {
      return {
        unit: null,
        errors: [
          { message: 'User must be logged in to be able to do this action' },
        ],
      };
    }

    const { name, abbreviation } = input;

    const existingUnit = await prisma.unit.findUnique({
      where: {
        name,
      },
    });

    if (existingUnit !== null) {
      return {
        unit: null,
        errors: [
          { message: `There is already a unit with the name "${name}"` },
        ],
      };
    }

    const newUnit = await prisma.unit.create({
      data: { name, abbreviation },
    });

    return {
      unit: newUnit,
      errors: [],
    };
  },
};
