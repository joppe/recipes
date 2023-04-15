/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** A person that can cook meals. */
export type Chef = {
  __typename?: 'Chef';
  /** The record id of the chef. */
  id: Scalars['ID'];
  /** The meals cooked by this chef. */
  meals?: Maybe<Array<Maybe<Meal>>>;
  /** A video or image of the chef. */
  media?: Maybe<Media>;
  /** The full name of the chef. */
  name: Scalars['String'];
  /** The skill tells how talented a chef is on a scale from 0 to 5. */
  skill: Scalars['Int'];
};

/** The result of a chef mutation */
export type ChefResult = {
  __typename?: 'ChefResult';
  /** The chef where the mutation was applied on. */
  chef?: Maybe<Chef>;
  /** The error messages. */
  errors?: Maybe<Array<Maybe<ErrorResult>>>;
};

export type CreateChefInput = {
  name: Scalars['String'];
  skill: Scalars['Int'];
};

export type CreateIngredientInput = {
  amount: Scalars['Float'];
  preparation: Scalars['String'];
  productId: Scalars['ID'];
  recipeId: Scalars['ID'];
  unitId: Scalars['ID'];
};

export type CreateInstructionInput = {
  mediaId?: InputMaybe<Scalars['ID']>;
  order: Scalars['Int'];
  recipeId: Scalars['ID'];
  text: Scalars['String'];
};

export type CreateMealInput = {
  chefId: Scalars['ID'];
  date: Scalars['String'];
  recipeId: Scalars['ID'];
  score: Scalars['Int'];
};

export type CreateMediaInput = {
  title: Scalars['String'];
  type: Scalars['String'];
  url: Scalars['String'];
};

export type CreateProductInput = {
  description?: InputMaybe<Scalars['String']>;
  mediaId?: InputMaybe<Scalars['ID']>;
  name: Scalars['String'];
};

export type CreateRecipeInput = {
  cookingTime?: InputMaybe<Scalars['Int']>;
  course?: InputMaybe<Scalars['String']>;
  difficulty: Scalars['Int'];
  mediaId?: InputMaybe<Scalars['ID']>;
  name: Scalars['String'];
  preparationTime?: InputMaybe<Scalars['Int']>;
  servings: Scalars['Int'];
  source?: InputMaybe<Scalars['String']>;
};

export type CreateUnitInput = {
  abbreviation: Scalars['String'];
  name: Scalars['String'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

/** The error(s) that occured when invoking a mutation. */
export type ErrorResult = {
  __typename?: 'ErrorResult';
  /** The error message. */
  message: Scalars['String'];
};

/** An ingredient for a recipe. */
export type Ingredient = {
  __typename?: 'Ingredient';
  /** The amount of product needed for the recipe. */
  amount: Scalars['Float'];
  /** The record id of the ingredient. */
  id: Scalars['ID'];
  /** The preparation needed for this product when used in this recipe. */
  preparation: Scalars['String'];
  /** The product that is used as an ingredient. */
  product: Product;
  /** The recipe this ingredient is used in. */
  recipe: Recipe;
  /** The unit that applies on the amount provided for this ingredient. */
  unit: Unit;
};

/** The result of a ingredient mutation */
export type IngredientResult = {
  __typename?: 'IngredientResult';
  /** The error messages. */
  errors?: Maybe<Array<Maybe<ErrorResult>>>;
  /** The ingredient where the mutation was applied on. */
  ingredient?: Maybe<Ingredient>;
};

/** An instruction that is needed to cook a recipe. */
export type Instruction = {
  __typename?: 'Instruction';
  /** The record id of the instruction. */
  id: Scalars['ID'];
  /** A video or image of the instruction. */
  media?: Maybe<Media>;
  /** Tells when this instruction needs to be done. */
  order: Scalars['Int'];
  /** The recipe this instruction belongs to. */
  recipe: Recipe;
  /** The actual instruction for the recipe. */
  text: Scalars['String'];
};

/** The result of a instruction mutation */
export type InstructionResult = {
  __typename?: 'InstructionResult';
  /** The error messages. */
  errors?: Maybe<Array<Maybe<ErrorResult>>>;
  /** The instruction where the mutation was applied on. */
  instruction?: Maybe<Instruction>;
};

/** A meal is a recipe cooked by a chef on a certain date. */
export type Meal = {
  __typename?: 'Meal';
  /** The chef that prepared the meal */
  chef: Chef;
  /** The date when the meal is (or will be) preparred. */
  date: Scalars['String'];
  /** The record id of the meal. */
  id: Scalars['ID'];
  /** The recipe used for this meal. */
  recipe: Recipe;
  /** How tastefull a meal was on a scale of 0 to 5. */
  score: Scalars['Int'];
};

/** The result of a meal mutation */
export type MealResult = {
  __typename?: 'MealResult';
  /** The error messages. */
  errors?: Maybe<Array<Maybe<ErrorResult>>>;
  /** The meal where the mutation was applied on. */
  meal?: Maybe<Meal>;
};

/** A video or image. */
export type Media = {
  __typename?: 'Media';
  /** The record id of the media. */
  id: Scalars['ID'];
  /** The title of the media. */
  title: Scalars['String'];
  /** The type of media. */
  type: Scalars['String'];
  /** The url to the file. */
  url: Scalars['String'];
};

/** The result of a media mutation */
export type MediaResult = {
  __typename?: 'MediaResult';
  /** The error messages. */
  errors?: Maybe<Array<Maybe<ErrorResult>>>;
  /** The media where the mutation was applied on. */
  media?: Maybe<Media>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createChef?: Maybe<ChefResult>;
  createIngredient?: Maybe<IngredientResult>;
  createInstruction?: Maybe<InstructionResult>;
  createMeal?: Maybe<MealResult>;
  createMedia?: Maybe<MediaResult>;
  createProduct?: Maybe<ProductResult>;
  createRecipe?: Maybe<RecipeResult>;
  createUnit?: Maybe<UnitResult>;
  createUploadUrl?: Maybe<UploadUrl>;
  createUser?: Maybe<UserResult>;
  deleteChef?: Maybe<ChefResult>;
  deleteIngredient?: Maybe<IngredientResult>;
  deleteInstruction?: Maybe<InstructionResult>;
  deleteMeal?: Maybe<MealResult>;
  deleteMedia?: Maybe<MediaResult>;
  deleteProduct?: Maybe<ProductResult>;
  deleteRecipe?: Maybe<RecipeResult>;
  deleteUnit?: Maybe<UnitResult>;
  deleteUser?: Maybe<UserResult>;
  updateChef?: Maybe<ChefResult>;
  updateIngredient?: Maybe<IngredientResult>;
  updateInstruction?: Maybe<InstructionResult>;
  updateMeal?: Maybe<MealResult>;
  updateMedia?: Maybe<MediaResult>;
  updateProduct?: Maybe<ProductResult>;
  updateRecipe?: Maybe<RecipeResult>;
  updateUnit?: Maybe<UnitResult>;
  updateUser?: Maybe<UserResult>;
};

export type MutationCreateChefArgs = {
  input: CreateChefInput;
};

export type MutationCreateIngredientArgs = {
  input: CreateIngredientInput;
};

export type MutationCreateInstructionArgs = {
  input: CreateInstructionInput;
};

export type MutationCreateMealArgs = {
  input: CreateMealInput;
};

export type MutationCreateMediaArgs = {
  input: CreateMediaInput;
};

export type MutationCreateProductArgs = {
  input: CreateProductInput;
};

export type MutationCreateRecipeArgs = {
  input: CreateRecipeInput;
};

export type MutationCreateUnitArgs = {
  input: CreateUnitInput;
};

export type MutationCreateUploadUrlArgs = {
  contentType: Scalars['String'];
  fileName: Scalars['String'];
};

export type MutationCreateUserArgs = {
  input?: InputMaybe<CreateUserInput>;
};

export type MutationDeleteChefArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteIngredientArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteInstructionArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteMealArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteMediaArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteProductArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteRecipeArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteUnitArgs = {
  id: Scalars['ID'];
};

export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};

export type MutationUpdateChefArgs = {
  id: Scalars['ID'];
  input: UpdateChefInput;
};

export type MutationUpdateIngredientArgs = {
  id: Scalars['ID'];
  input: UpdateIngredientInput;
};

export type MutationUpdateInstructionArgs = {
  id: Scalars['ID'];
  input: UpdateInstructionInput;
};

export type MutationUpdateMealArgs = {
  id: Scalars['ID'];
  input: UpdateMealInput;
};

export type MutationUpdateMediaArgs = {
  id: Scalars['ID'];
  input: UpdateMediaInput;
};

export type MutationUpdateProductArgs = {
  id: Scalars['ID'];
  input: UpdateProductInput;
};

export type MutationUpdateRecipeArgs = {
  id: Scalars['ID'];
  input: UpdateRecipeInput;
};

export type MutationUpdateUnitArgs = {
  id: Scalars['ID'];
  input: UpdateUnitInput;
};

export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  input: UpdateUserInput;
};

/** A product that can be used as ingredient in a recipe. */
export type Product = {
  __typename?: 'Product';
  /** The description of the product. */
  description?: Maybe<Scalars['String']>;
  /** The record id of the product. */
  id: Scalars['ID'];
  /** The ingredients where this product is used in. */
  ingredients?: Maybe<Array<Maybe<Ingredient>>>;
  /** A video or image of the product. */
  media?: Maybe<Media>;
  /** The name of the product. */
  name: Scalars['String'];
};

/** The result of a product mutation */
export type ProductResult = {
  __typename?: 'ProductResult';
  /** The error messages. */
  errors?: Maybe<Array<Maybe<ErrorResult>>>;
  /** The product where the mutation was applied on. */
  product?: Maybe<Product>;
};

export type Query = {
  __typename?: 'Query';
  chef?: Maybe<Chef>;
  chefs: Array<Chef>;
  ingredient?: Maybe<Ingredient>;
  ingredients: Array<Ingredient>;
  instruction?: Maybe<Instruction>;
  instructions: Array<Instruction>;
  me?: Maybe<User>;
  meals: Array<Meal>;
  media?: Maybe<Media>;
  medias: Array<Media>;
  product?: Maybe<Product>;
  products: Array<Product>;
  recipe?: Maybe<Recipe>;
  recipes: Array<Recipe>;
  unit?: Maybe<Unit>;
  units: Array<Unit>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type QueryChefArgs = {
  id: Scalars['ID'];
};

export type QueryIngredientArgs = {
  id: Scalars['ID'];
};

export type QueryInstructionArgs = {
  id: Scalars['ID'];
};

export type QueryMediaArgs = {
  id: Scalars['ID'];
};

export type QueryProductArgs = {
  id: Scalars['ID'];
};

export type QueryRecipeArgs = {
  id: Scalars['ID'];
};

export type QueryUnitArgs = {
  id: Scalars['ID'];
};

export type QueryUserArgs = {
  id: Scalars['ID'];
};

/** A recipe to cook a meal. */
export type Recipe = {
  __typename?: 'Recipe';
  /** The time in minutes the whole cooking takes. */
  cookingTime?: Maybe<Scalars['Int']>;
  /** For which course this recipe is best suited. */
  course?: Maybe<Scalars['String']>;
  /** How difficult this recipe is on a scale from 0 to 5. */
  difficulty: Scalars['Int'];
  /** The record id of the recipe. */
  id: Scalars['ID'];
  /** The list of ingredients that are needed for this recipe. */
  ingredients?: Maybe<Array<Maybe<Ingredient>>>;
  /** The list of instructions for this recipe. */
  instructions?: Maybe<Array<Maybe<Instruction>>>;
  /** The list of meals that used this recipe. */
  meals?: Maybe<Array<Maybe<Meal>>>;
  /** A video or image of the recipe. */
  media?: Maybe<Media>;
  /** The name of the recipe. */
  name: Scalars['String'];
  /** The time in minutes to prepare the meal. */
  preparationTime?: Maybe<Scalars['Int']>;
  /** The amount of people that can eat from this recipe. */
  servings: Scalars['Int'];
  /** Where does this recipe come from. */
  source?: Maybe<Scalars['String']>;
};

/** The result of a recipe mutation */
export type RecipeResult = {
  __typename?: 'RecipeResult';
  /** The error messages. */
  errors?: Maybe<Array<Maybe<ErrorResult>>>;
  /** The recipe where the mutation was applied on. */
  recipe?: Maybe<Recipe>;
};

/** An unit to apply to the amount of ingredient needed in a recipe. */
export type Unit = {
  __typename?: 'Unit';
  /** The abbreviation of the unit. */
  abbreviation: Scalars['String'];
  /** The record id of the unit. */
  id: Scalars['ID'];
  /** The name of the unit. */
  name: Scalars['String'];
};

/** The result of a unit mutation */
export type UnitResult = {
  __typename?: 'UnitResult';
  /** The error messages. */
  errors?: Maybe<Array<Maybe<ErrorResult>>>;
  /** The unit where the mutation was applied on. */
  unit?: Maybe<Unit>;
};

export type UpdateChefInput = {
  name: Scalars['String'];
  skill: Scalars['Int'];
};

export type UpdateIngredientInput = {
  amount: Scalars['Float'];
  preparation: Scalars['String'];
  productId: Scalars['ID'];
  recipeId: Scalars['ID'];
  unitId: Scalars['ID'];
};

export type UpdateInstructionInput = {
  mediaId?: InputMaybe<Scalars['ID']>;
  order: Scalars['Int'];
  recipeId: Scalars['ID'];
  text: Scalars['String'];
};

export type UpdateMealInput = {
  chefId: Scalars['ID'];
  date: Scalars['String'];
  recipeId: Scalars['ID'];
  score: Scalars['Int'];
};

export type UpdateMediaInput = {
  title: Scalars['String'];
  type: Scalars['String'];
  url: Scalars['String'];
};

export type UpdateProductInput = {
  description?: InputMaybe<Scalars['String']>;
  mediaId?: InputMaybe<Scalars['ID']>;
  name: Scalars['String'];
};

export type UpdateRecipeInput = {
  cookingTime?: InputMaybe<Scalars['Int']>;
  course?: InputMaybe<Scalars['String']>;
  difficulty: Scalars['Int'];
  mediaId?: InputMaybe<Scalars['ID']>;
  name: Scalars['String'];
  preparationTime?: InputMaybe<Scalars['Int']>;
  servings: Scalars['Int'];
  source?: InputMaybe<Scalars['String']>;
};

export type UpdateUnitInput = {
  abbreviation: Scalars['String'];
  name: Scalars['String'];
};

export type UpdateUserInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

/** An URL where an image can be uploaded to. */
export type UploadUrl = {
  __typename?: 'UploadUrl';
  /** The name of the file. */
  fileName: Scalars['String'];
  /** The URL. */
  url: Scalars['String'];
};

/** An user that can login and modify the data. */
export type User = {
  __typename?: 'User';
  /** The email address of the user. */
  email: Scalars['String'];
  /** The record id of the user. */
  id: Scalars['ID'];
  /** The name of the user. */
  name: Scalars['String'];
  /** The password of the user. */
  password: Scalars['String'];
};

/** The result of a user mutation */
export type UserResult = {
  __typename?: 'UserResult';
  /** The error messages. */
  errors?: Maybe<Array<Maybe<ErrorResult>>>;
  /** The user where the mutation was applied on. */
  user?: Maybe<User>;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  me?: { __typename?: 'User'; id: string; name: string; email: string } | null;
};

export type CreateUnitMutationVariables = Exact<{
  input: CreateUnitInput;
}>;

export type CreateUnitMutation = {
  __typename?: 'Mutation';
  createUnit?: {
    __typename?: 'UnitResult';
    unit?: { __typename?: 'Unit'; name: string; abbreviation: string } | null;
    errors?: Array<{
      __typename?: 'ErrorResult';
      message: string;
    } | null> | null;
  } | null;
};

export type DeleteUnitMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type DeleteUnitMutation = {
  __typename?: 'Mutation';
  deleteUnit?: {
    __typename?: 'UnitResult';
    unit?: { __typename?: 'Unit'; name: string; abbreviation: string } | null;
    errors?: Array<{
      __typename?: 'ErrorResult';
      message: string;
    } | null> | null;
  } | null;
};

export type UnitQueryVariables = Exact<{
  id: Scalars['ID'];
}>;

export type UnitQuery = {
  __typename?: 'Query';
  unit?: {
    __typename?: 'Unit';
    id: string;
    name: string;
    abbreviation: string;
  } | null;
};

export type UnitsQueryVariables = Exact<{ [key: string]: never }>;

export type UnitsQuery = {
  __typename?: 'Query';
  units: Array<{
    __typename?: 'Unit';
    id: string;
    name: string;
    abbreviation: string;
  }>;
};

export type UpdateUnitMutationVariables = Exact<{
  id: Scalars['ID'];
  input: UpdateUnitInput;
}>;

export type UpdateUnitMutation = {
  __typename?: 'Mutation';
  updateUnit?: {
    __typename?: 'UnitResult';
    unit?: { __typename?: 'Unit'; name: string; abbreviation: string } | null;
    errors?: Array<{
      __typename?: 'ErrorResult';
      message: string;
    } | null> | null;
  } | null;
};

export const MeDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'me' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'me' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const CreateUnitDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'createUnit' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateUnitInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createUnit' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'unit' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'abbreviation' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'errors' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'message' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateUnitMutation, CreateUnitMutationVariables>;
export const DeleteUnitDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'deleteUnit' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteUnit' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'unit' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'abbreviation' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'errors' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'message' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteUnitMutation, DeleteUnitMutationVariables>;
export const UnitDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'unit' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'unit' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'abbreviation' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UnitQuery, UnitQueryVariables>;
export const UnitsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'units' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'units' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'abbreviation' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UnitsQuery, UnitsQueryVariables>;
export const UpdateUnitDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'updateUnit' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UpdateUnitInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateUnit' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'unit' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'abbreviation' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'errors' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'message' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdateUnitMutation, UpdateUnitMutationVariables>;
