import { Ingredient, Media, Product } from '@prisma/client';
import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import { Context } from '../../server/Context';
import { IngredientType } from '../ingredient';
import { MediaType } from '../media';

export const ProductType: GraphQLObjectType = new GraphQLObjectType({
  name: 'Product',
  description: 'A product that can be used as ingredient in a recipe.',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The record id of the product.',
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The name of the product.',
    },
    description: {
      type: GraphQLString,
      description: 'The description of the product.',
    },
    media: {
      type: MediaType,
      description: 'A video or image of the product.',
      resolve: async (
        product: Product,
        _: unknown,
        { mediaLoader }: Context,
      ): Promise<Media | null> => {
        if (product.mediaId === null) {
          return null;
        }

        return mediaLoader.load(product.mediaId);
      },
    },
    ingredients: {
      type: new GraphQLList(IngredientType),
      description: 'The ingredients where this product is used in.',
      resolve: async (
        product: Product,
        _: unknown,
        { prisma }: Context,
      ): Promise<Ingredient[]> => {
        return prisma.ingredient.findMany({
          where: { productId: product.id },
        });
      },
    },
  }),
});
