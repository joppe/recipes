'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { getRecipes } from '@/actions/recipes';
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

export default function Recipes() {
  const selected = useRef<Recipe | null>(null);
  const [displayMode, setDisplayMode] = useState<DisplayMode>(DisplayMode.List);
  const [recipes, setRecipes] = useState<Recipe[] | undefined>(undefined);

  useEffect(() => {
    async function fetchRecipes() {
      const recipes = await getRecipes();

      setRecipes(recipes);
    }

    selected.current = null;

    if (displayMode === DisplayMode.List) {
      void fetchRecipes();
    }
  }, [displayMode]);

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
        <Heading>
          <HeadingTitle>Recipes</HeadingTitle>
          <HeadingDescription>
            Recipes are used to indicate the quantity of a product.
          </HeadingDescription>
        </Heading>

        <DataView>
          {recipes === undefined && <Loading />}
          {recipes !== undefined && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Cooking time</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recipes.map((recipe) => {
                  return (
                    <TableRow key={recipe.id}>
                      <TableCell className="font-medium">
                        <Link href={`/recipes/${recipe.id}`}>
                          {recipe.name}
                        </Link>
                      </TableCell>
                      <TableCell>{recipe.cookingTime}</TableCell>
                      <TableCell>
                        <ActionMenu
                          handleEdit={() => {
                            selected.current = recipe;
                            setDisplayMode(DisplayMode.Edit);
                          }}
                          handleDelete={() => {
                            selected.current = recipe;
                            setDisplayMode(DisplayMode.Delete);
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
        {recipes !== undefined && (
          <DataStats>
            <strong>{recipes.length}</strong> recipes
          </DataStats>
        )}
      </Section>
    </>
  );
}
