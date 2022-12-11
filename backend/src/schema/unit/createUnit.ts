import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

import { Context } from '../../server';
import { UnitMutationResult } from './UnitMutationResult';
import { UnitResultType } from './UnitResultType';

type ResolveArgs = {
  input: {
    name: string;
    abbreviation: string;
  };
};

const inputCreateUnitType = new GraphQLInputObjectType({
  name: 'CreateUnitInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    abbreviation: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export const createUnit = {
  type: UnitResultType,
  args: {
    input: { type: inputCreateUnitType },
  },
  resolve: async (
    _: unknown,
    { input }: ResolveArgs,
    { prisma }: Context,
  ): Promise<UnitMutationResult> => {
    const { name, abbreviation } = input;

    const existingUnit = await prisma.unit.findFirst({
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
      unit: {
        id: newUnit.id,
        name: newUnit.name,
        abbreviation: newUnit.abbreviation,
      },
      errors: [],
    };
  },
};
