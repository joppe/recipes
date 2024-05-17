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

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  email: varchar('email').notNull(),
  password: varchar('password').notNull(),
  role: varchar('role').notNull(),
});

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
  recipeId: integer('recipe_id')
    .references(() => recipes.id)
    .notNull(),
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
  recipeId: integer('recipe_id')
    .references(() => recipes.id)
    .notNull(),
  mediaId: integer('media_id').references(() => media.id),
});

export const recipes = pgTable('recipe', {
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

export const recipesRelations = relations(recipes, ({ many }) => ({
  ingredients: many(ingredients),
  instructions: many(instructions),
}));

export const meals = pgTable('meal', {
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
  abbreviation: varchar('abbreviation').notNull(),
});

export const insertUserSchema = createInsertSchema(units, {
  name: z.string().min(3).max(255),
  abbreviation: z.string().min(1).max(255),
});

export type CreateUnitData = z.infer<typeof insertUserSchema>;
