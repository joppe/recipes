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
import { Loading } from '@/components/layout/loading/Loading';
import { Create, Delete, Edit } from '@/components/recipes';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
  Idle = 'idle',
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
      setDisplayMode(DisplayMode.Idle);
    }

    selected.current = null;

    if (displayMode === DisplayMode.List) {
      void fetchRecipes();
    }
  }, [displayMode]);

  return (
    <>
      {displayMode === DisplayMode.Add && (
        <Create
          onFinish={() => setDisplayMode(DisplayMode.List)}
          onCancel={() => setDisplayMode(DisplayMode.Idle)}
        />
      )}
      {displayMode === DisplayMode.Edit && selected.current && (
        <Edit
          recipe={selected.current}
          onFinish={() => setDisplayMode(DisplayMode.List)}
          onCancel={() => setDisplayMode(DisplayMode.Idle)}
        />
      )}
      {displayMode === DisplayMode.Delete && selected.current && (
        <Delete
          recipe={selected.current}
          onFinish={() => setDisplayMode(DisplayMode.List)}
          onCancel={() => setDisplayMode(DisplayMode.Idle)}
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

      <Card>
        <CardHeader>
          <CardTitle>Recipes</CardTitle>
          <CardDescription>Manage your recipes here.</CardDescription>
        </CardHeader>

        <CardContent>
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
                        <Link href={`/planner/recipes/${recipe.id}`}>
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
        </CardContent>
      </Card>
    </>
  );
}
