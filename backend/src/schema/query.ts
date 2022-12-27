import { GraphQLObjectType } from 'graphql';

import { chef, chefs } from './chef';
import { ingredient, ingredients } from './ingredient';
import { instruction, instructions } from './instruction';
import { meals } from './meal';
import { media, medias } from './media';
import { product, products } from './product';
import { recipe, recipes } from './recipe';
import { unit, units } from './unit';
import { me, user, users } from './user';

export const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    chef,
    chefs,
    ingredient,
    ingredients,
    instruction,
    instructions,
    me,
    meals,
    media,
    medias,
    product,
    products,
    recipe,
    recipes,
    unit,
    units,
    user,
    users,
  },
});
