import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql/index';

import { IngredientType } from '../ingredient/IngredientType';
import { MediaType } from '../media/MediaType';

export const RecipeType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Recipe',
  description: 'A recipe to cook a meal.',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The record id of the recipe.',
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The name of the recipe.',
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The description of the recipe.',
    },
    media: {
      type: MediaType,
      description: 'A video or image of the recipe.',
    },
    ingredients: {
      type: new GraphQLList(IngredientType),
      description: 'The list of ingredients that are needed for this recipe.',
    },
  }),
});
