import { relations } from 'drizzle-orm';
import {
  date,
  integer,
  pgTable,
  real,
  serial,
  smallint,
  varchar,
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';

/**
 * Tables
 */
export const chefs = pgTable('chefs', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  skill: smallint('skill').notNull(),
});

export const media = pgTable('media', {
  id: serial('id').primaryKey(),
  type: varchar('type').notNull(),
  title: varchar('type').notNull(),
  url: varchar('url').notNull().unique(),
});

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  description: varchar('description'),
  mediaId: integer('media_id').references(() => media.id),
});

export const ingredients = pgTable('ingredients', {
  id: serial('id').primaryKey(),
  quantity: real('quantity').notNull(),
  preparation: varchar('preparation').notNull(),
  recipeId: integer('recipe_id').notNull(),
  productId: integer('product_id')
    .references(() => products.id)
    .notNull(),
  unitId: integer('unit_id')
    .references(() => units.id)
    .notNull(),
});

export const instructions = pgTable('instructions', {
  id: serial('id').primaryKey(),
  order: smallint('order').notNull(),
  description: varchar('description').notNull(),
  recipeId: integer('recipe_id').notNull(),
  mediaId: integer('media_id').references(() => media.id),
});

export const recipes = pgTable('recipes', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  preparationTime: smallint('preparation_time'),
  cookingTime: smallint('cooking_time'),
  difficulty: smallint('difficulty'),
  course: varchar('course'),
  servings: smallint('servings').notNull(),
  source: varchar('source'),
  mediaId: integer('media_id').references(() => media.id),
});

export const meals = pgTable('meals', {
  id: serial('id').primaryKey(),
  date: date('date', { mode: 'string' }).notNull(),
  score: smallint('score'),
  chefId: integer('chef_id')
    .references(() => chefs.id)
    .notNull(),
  recipeId: integer('recipe_id')
    .references(() => recipes.id)
    .notNull(),
});

export const units = pgTable('units', {
  id: serial('id').primaryKey(),
  name: varchar('name').unique().notNull(),
  abbreviation: varchar('abbreviation'),
});

/**
 * Relations
 */
export const chefsRelations = relations(chefs, ({ many }) => ({
  meals: many(meals),
}));

export const instructionsRelations = relations(instructions, ({ one }) => ({
  recipe: one(recipes, {
    fields: [instructions.recipeId],
    references: [recipes.id],
  }),
}));

export const recipesRelations = relations(recipes, ({ many }) => ({
  ingredients: many(ingredients),
  instructions: many(instructions),
  meals: many(meals),
}));

export const mealsRelations = relations(meals, ({ one }) => ({
  chef: one(chefs, {
    fields: [meals.chefId],
    references: [chefs.id],
  }),
  recipe: one(recipes, {
    fields: [meals.recipeId],
    references: [recipes.id],
  }),
}));

export const ingredientsRelations = relations(ingredients, ({ one }) => ({
  recipe: one(recipes, {
    fields: [ingredients.recipeId],
    references: [recipes.id],
  }),
  product: one(products, {
    fields: [ingredients.productId],
    references: [products.id],
  }),
  unit: one(units, {
    fields: [ingredients.unitId],
    references: [units.id],
  }),
}));

export const insertChefSchema = createInsertSchema(chefs, {
  name: z.string().min(3).max(255),
  skill: z.number().int().gte(1).lte(5),
});

/**
 * Types
 */
export type Chef = typeof chefs.$inferSelect;
export type ChefFormData = z.infer<typeof insertChefSchema>;

export type Unit = typeof units.$inferSelect;
export type UnitFormData = z.infer<typeof insertUnitSchema>;

export type Product = typeof products.$inferSelect;
export type ProductFormData = z.infer<typeof insertProductSchema>;

export type Instruction = typeof instructions.$inferSelect;
export type InstructionFormData = z.infer<typeof insertInstructionSchema>;

export type Ingredient = typeof ingredients.$inferSelect & {
  product: Product;
  unit: Unit;
};
export type IngredientFormData = z.infer<typeof insertIngredientSchema>;

export type Recipe = typeof recipes.$inferSelect & {
  instructions?: Instruction[];
  ingredients?: Ingredient[];
};
export type RecipeFormData = z.infer<typeof insertRecipeSchema>;
export type Meal = typeof meals.$inferSelect & {
  chef: Chef;
  recipe: Recipe;
};
export type MealFormData = z.infer<typeof insertMealSchema>;

/**
 * Zod schemas
 */
export const insertUnitSchema = createInsertSchema(units, {
  name: z.string().min(3).max(255),
  abbreviation: (schema) => schema.abbreviation,
});

export const insertProductSchema = createInsertSchema(products, {
  name: z.string().min(2).max(255),
  description: (schema) => schema.description,
});

export const insertInstructionSchema = createInsertSchema(instructions, {
  order: z.number().int(),
  description: z.string(),
});

export const insertIngredientSchema = createInsertSchema(ingredients, {
  quantity: z.number().int().positive(),
  preparation: (schema) => schema.preparation,
  productId: (schema) => schema.productId,
  unitId: (schema) => schema.unitId,
});

export const insertRecipeSchema = createInsertSchema(recipes, {
  name: z.string().min(2).max(255),
  preparationTime: (schema) => schema.preparationTime,
  cookingTime: (schema) => schema.cookingTime,
  difficulty: z.number().int().gte(1).lte(5),
  course: (schema) => schema.course,
  servings: (schema) => schema.servings,
  source: (schema) => schema.source,
});

export const insertMealSchema = createInsertSchema(meals, {
  date: z.string().date(),
  chefId: (schema) => schema.chefId,
  recipeId: (schema) => schema.recipeId,
});
