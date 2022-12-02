import {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql/index';

import { MediaType } from '../media/MediaType';
import { RecipeType } from '../recipe/RecipeType';

export const InstructionType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Instruction',
  description: 'An instruction that is needed to cook a recipe.',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The record id of the instruction.',
    },
    order: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'Tells when this instruction needs to be done.',
    },
    text: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The actual instruction for the recipe.',
    },
    media: {
      type: MediaType,
      description: 'A video or image of the instruction.',
    },
    recipe: {
      type: new GraphQLNonNull(RecipeType),
      description: 'The recipe this instruction belongs to.',
    },
  }),
});
