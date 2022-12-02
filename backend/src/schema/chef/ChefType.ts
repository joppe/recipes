import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql/index';

import { MealType } from '../meal/MealType';
import { MediaType } from '../media/MediaType';

export const ChefType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Chef',
  description: 'A person that can cook meals.',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The record id of the chef.',
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The full name of the chef.',
    },
    skill: {
      type: new GraphQLNonNull(GraphQLInt),
      description:
        'The skill tells how talented a chef is on a scale from 0 to 5.',
    },
    media: {
      type: MediaType,
      description: 'A video or image of the chef.',
    },
    meals: {
      type: new GraphQLList(MealType),
      description: 'The meals cooked by this chef.',
    },
  }),
});
