import {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql/index';

import { ChefType } from '../chef/ChefType';
import { RecipeType } from '../recipe/RecipeType';

export const MealType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Meal',
  description: 'A meal is a recipe cooked by a chef on a certain date.',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The record id of the meal.',
    },
    date: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The date when the meal is (or will be) preparred.',
    },
    score: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'How tastefull a meal was on a scale of 0 to 5.',
    },
    chef: {
      type: new GraphQLNonNull(ChefType),
      description: 'The chef that prepared the meal',
    },
    recipe: {
      type: new GraphQLNonNull(RecipeType),
      description: 'The recipe used for this meal.',
    },
  }),
});
