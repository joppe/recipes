'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { getRecipe } from '@/actions/recipes';
import { ActionMenu } from '@/components/layout/action-menu';
import {
  AddButton,
  ButtonBar,
  ButtonGroup,
} from '@/components/layout/button-bar';
import { Heading, HeadingTitle } from '@/components/layout/heading';
import { Loading } from '@/components/layout/loading/Loading';
import { DataView, Section } from '@/components/layout/section';
import {
  Create as CreateInstruction,
  Delete as DeleteInstruction,
  Edit as EditInstruction,
} from '@/components/recipes/instructions';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Ingredient, Instruction, Recipe, instructions } from '@/db/schema';

enum DisplayMode {
  List = 'list',
  AddInstruction = 'add-instruction',
  DeleteInstruction = 'delete-instruction',
  EditInstruction = 'edit-instruction',
}

type RecipesProps = {
  params: {
    id: string;
  };
};

export default function Recipes({ params }: RecipesProps) {
  const id = parseInt(params.id, 10);
  const selectedInstruction = useRef<Instruction | null>(null);
  const selectedIngredient = useRef<Ingredient | null>(null);
  const [displayMode, setDisplayMode] = useState<DisplayMode>(DisplayMode.List);
  const [recipe, setRecipe] = useState<Recipe | undefined>(undefined);

  useEffect(() => {
    async function fetchRecipe() {
      const recipe = await getRecipe(id);

      setRecipe(recipe);
    }

    selectedInstruction.current = null;

    if (displayMode === DisplayMode.List) {
      void fetchRecipe();
    }
  }, [displayMode, id]);

  return (
    <>
      {displayMode === DisplayMode.AddInstruction && (
        <CreateInstruction
          recipeId={id}
          onFinish={() => setDisplayMode(DisplayMode.List)}
        />
      )}
      {displayMode === DisplayMode.EditInstruction &&
        selectedInstruction.current && (
          <EditInstruction
            instruction={selectedInstruction.current}
            onFinish={() => setDisplayMode(DisplayMode.List)}
          />
        )}
      {displayMode === DisplayMode.DeleteInstruction &&
        selectedInstruction.current && (
          <DeleteInstruction
            instruction={selectedInstruction.current}
            onFinish={() => setDisplayMode(DisplayMode.List)}
          />
        )}
      <Section>
        {recipe === undefined && <Loading />}
        {recipe !== undefined && (
          <Heading>
            <HeadingTitle>Recipe: {recipe.name}</HeadingTitle>
            <div className="mt-6">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-xs font-medium leading-6 text-gray-900">
                    Preparation time
                  </dt>
                  <dd className="mt-1 text-xs leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {recipe.preparationTime} minutes
                  </dd>
                </div>
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-xs font-medium leading-6 text-gray-900">
                    Cooking time
                  </dt>
                  <dd className="mt-1 text-xs leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {recipe.cookingTime} minutes
                  </dd>
                </div>
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-xs font-medium leading-6 text-gray-900">
                    Difficulty
                  </dt>
                  <dd className="mt-1 text-xs leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {recipe.difficulty}
                  </dd>
                </div>
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-xs font-medium leading-6 text-gray-900">
                    Course
                  </dt>
                  <dd className="mt-1 text-xs leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {recipe.course}
                  </dd>
                </div>
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-xs font-medium leading-6 text-gray-900">
                    Servings
                  </dt>
                  <dd className="mt-1 text-xs leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {recipe.servings}
                  </dd>
                </div>
                <div className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-xs font-medium leading-6 text-gray-900">
                    Source
                  </dt>
                  <dd className="mt-1 text-xs leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {recipe.source}
                  </dd>
                </div>
              </dl>
            </div>
          </Heading>
        )}
      </Section>

      <ButtonBar>
        <ButtonGroup pullRight>
          <AddButton
            text="Add Instruction"
            onClick={() => setDisplayMode(DisplayMode.AddInstruction)}
          />
        </ButtonGroup>
      </ButtonBar>

      <Section>
        <Heading>
          <HeadingTitle>Instructions</HeadingTitle>
        </Heading>

        <DataView>
          {recipe !== undefined && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recipe.instructions?.map((instruction) => {
                  return (
                    <TableRow key={instruction.id}>
                      <TableCell className="font-medium">
                        {instruction.description}
                      </TableCell>
                      <TableCell>
                        <ActionMenu
                          handleEdit={() => {
                            selectedInstruction.current = instruction;
                            setDisplayMode(DisplayMode.EditInstruction);
                          }}
                          handleDelete={() => {
                            selectedInstruction.current = instruction;
                            setDisplayMode(DisplayMode.DeleteInstruction);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </DataView>
      </Section>
    </>
  );
}
