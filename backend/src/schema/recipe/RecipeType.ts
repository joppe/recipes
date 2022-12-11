import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql/index';

import { IngredientType } from '../ingredient/IngredientType';
import { InstructionType } from '../instruction/InstructionType';
import { MealType } from '../meal/MealType';
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
    preparation_time: {
      type: GraphQLInt,
      description: 'The time in minutes to prepare the meal.',
    },
    cooking_time: {
      type: GraphQLInt,
      description: 'The time in minutes the whole cooking takes.',
    },
    difficulty: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'How difficult this recipe is on a scale from 0 to 5.',
    },
    course: {
      type: GraphQLString,
      description: 'For which course this recipe is best suited.',
    },
    servings: {
      type: new GraphQLNonNull(GraphQLInt),
      description: 'The amount of people that can eat from this recipe.',
    },
    source: {
      type: GraphQLString,
      description: 'Where does this recipe come from.',
    },
    media: {
      type: MediaType,
      description: 'A video or image of the recipe.',
    },
    meals: {
      type: new GraphQLList(MealType),
      description: 'The list of meals that used this recipe.',
    },
    instructions: {
      type: new GraphQLList(InstructionType),
      description: 'The list of instruction for this recipe.',
    },
    ingredients: {
      type: new GraphQLList(IngredientType),
      description: 'The list of ingredients that are needed for this recipe.',
    },
  }),
});
