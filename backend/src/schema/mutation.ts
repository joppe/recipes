import { GraphQLObjectType } from 'graphql';

import { createChef, deleteChef, updateChef } from './chef';
import {
  createIngredient,
  deleteIngredient,
  updateIngredient,
} from './ingredient';
import {
  createInstruction,
  deleteInstruction,
  updateInstruction,
} from './instruction';
import { createMeal, deleteMeal, updateMeal } from './meal';
import { createMedia, deleteMedia, updateMedia } from './media';
import { createProduct, deleteProduct, updateProduct } from './product';
import { createRecipe, deleteRecipe, updateRecipe } from './recipe';
import { createUnit, deleteUnit, updateUnit } from './unit';
import { createUser, deleteUser, login, updateUser } from './user';

export const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createChef,
    deleteChef,
    updateChef,
    createIngredient,
    deleteIngredient,
    updateIngredient,
    createInstruction,
    deleteInstruction,
    updateInstruction,
    createMeal,
    deleteMeal,
    updateMeal,
    createMedia,
    deleteMedia,
    updateMedia,
    createProduct,
    deleteProduct,
    updateProduct,
    createRecipe,
    deleteRecipe,
    updateRecipe,
    createUnit,
    deleteUnit,
    updateUnit,
    createUser,
    deleteUser,
    login,
    updateUser,
  },
});
