'use client';

import { useEffect, useRef, useState } from 'react';

import { getRecipe } from '@/actions/recipes';
import { ActionMenu } from '@/components/layout/action-menu';
import {
  AddButton,
  ButtonBar,
  ButtonGroup,
} from '@/components/layout/button-bar';
import {
  Heading,
  HeadingDescription,
  HeadingTitle,
} from '@/components/layout/heading';
import { Loading } from '@/components/layout/loading/Loading';
import { DataStats, DataView, Section } from '@/components/layout/section';
import { Create, Delete, Edit } from '@/components/recipes';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Recipe } from '@/db/schema';

enum DisplayMode {
  List = 'list',
  Add = 'add',
  Delete = 'delete',
  Edit = 'edit',
}

type RecipesProps = {
  params: {
    id: string;
  };
};

export default function Recipes({ params }: RecipesProps) {
  const id = parseInt(params.id, 10);
  const selected = useRef<Recipe | null>(null);
  const [displayMode, setDisplayMode] = useState<DisplayMode>(DisplayMode.List);
  const [recipe, setRecipe] = useState<Recipe | undefined>(undefined);

  useEffect(() => {
    async function fetchRecipe() {
      const [recipe] = await getRecipe(id);

      setRecipe(recipe);
    }

    selected.current = null;

    if (displayMode === DisplayMode.List) {
      void fetchRecipe();
    }
  }, [displayMode, id]);

  return (
    <>
      {displayMode === DisplayMode.Add && (
        <Create onFinish={() => setDisplayMode(DisplayMode.List)} />
      )}
      {displayMode === DisplayMode.Edit && selected.current && (
        <Edit
          recipe={selected.current}
          onFinish={() => setDisplayMode(DisplayMode.List)}
        />
      )}
      {displayMode === DisplayMode.Delete && selected.current !== null && (
        <Delete
          recipe={selected.current}
          onFinish={() => setDisplayMode(DisplayMode.List)}
        />
      )}

      <ButtonBar>
        <ButtonGroup pullRight>
          <AddButton
            text="Add Recipe"
            onClick={() => setDisplayMode(DisplayMode.Add)}
          />
        </ButtonGroup>
      </ButtonBar>

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
    </>
  );
}
