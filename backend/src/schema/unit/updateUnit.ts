import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import { Context } from '../../server';
import { Unit } from '../../types';
import { UnitMutationResult } from './UnitMutationResult';
import { UnitResultType } from './UnitResultType';

type ResolveArgs = {
  id: string;
  input: {
    name: string;
    abbreviation: string;
  };
};

const inputUpdateUnitType = new GraphQLInputObjectType({
  name: 'UpdateUnitInput',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    abbreviation: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export const updateUnit = {
  type: UnitResultType,
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    input: { type: new GraphQLNonNull(inputUpdateUnitType) },
  },
  resolve: async (
    _: unknown,
    { id, input }: ResolveArgs,
    { prisma }: Context,
  ): Promise<UnitMutationResult> => {
    const { name, abbreviation } = input;

    const unit = await prisma.unit.findUnique({ where: { id } });

    if (unit === null) {
      return {
        unit: null,
        errors: [{ message: `Unit with id "${id}" not found` }],
      };
    }

    const payloadUnit = {
      name,
      abbreviation,
    };

    const newUnit = await prisma.unit.update({
      where: { id },
      data: payloadUnit as Unit,
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
