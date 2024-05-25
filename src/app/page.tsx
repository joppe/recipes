'use client';

import { addDays, format, formatISO, startOfWeek } from 'date-fns';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';

import { getChefs } from '@/actions/chefs';
import { getMealsForRange } from '@/actions/meals';
import { getRecipes } from '@/actions/recipes';
import { ActionMenu } from '@/components/layout/action-menu';
import { AddButton } from '@/components/layout/button-bar';
import { Create, Delete, Edit } from '@/components/meals';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Chef, Meal, Recipe } from '@/db/schema';

enum DisplayMode {
  Idle = 'idle',
  List = 'list',
  Add = 'add',
  Delete = 'delete',
  Edit = 'edit',
}

type Selected = {
  date: Date;
  meal?: Meal;
};

export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  const selected = useRef<Selected | null>(null);
  const [displayMode, setDisplayMode] = useState<DisplayMode>(DisplayMode.List);
  const [meals, setMeals] = useState<Meal[] | undefined>(undefined);
  const [chefs, setChefs] = useState<Chef[] | undefined>(undefined);
  const [recipes, setRecipes] = useState<Recipe[] | undefined>(undefined);
  const [date, setDate] = useState(new Date());
  const monday = startOfWeek(date, { weekStartsOn: 1 });
  const week = Array.from({ length: 7 }, (_, i) => {
    return addDays(monday, i);
  });
  const loading =
    chefs === undefined || recipes === undefined || meals === undefined;

  useEffect(() => {
    async function fetchAll() {
      const chefs = await getChefs();
      const recipes = await getRecipes();

      setChefs(chefs);
      setRecipes(recipes);
    }

    void fetchAll();
  }, []);

  useEffect(() => {
    async function fetchMeals() {
      const meals = await getMealsForRange(monday, addDays(monday, 6));

      setMeals(meals);
      setDisplayMode(DisplayMode.Idle);
    }

    selected.current = null;

    if (displayMode === DisplayMode.List) {
      void fetchMeals();
    }
  }, [displayMode]);

  if (!session) {
    return (
      <>
        <div>Unauthorized</div>
        <a
          href="/api/auth/signin"
          onClick={(e) => {
            e.preventDefault();
            signIn();
          }}
        >
          You must be signed in to view this page
        </a>
      </>
    );
  }

  return (
    <>
      {!loading && displayMode === DisplayMode.Add && selected.current && (
        <Create
          date={selected.current.date}
          chefs={chefs}
          recipes={recipes}
          onFinish={() => setDisplayMode(DisplayMode.List)}
          onCancel={() => setDisplayMode(DisplayMode.Idle)}
        />
      )}
      {!loading &&
        displayMode === DisplayMode.Edit &&
        selected.current?.meal && (
          <Edit
            meal={selected.current.meal}
            chefs={chefs}
            recipes={recipes}
            onFinish={() => setDisplayMode(DisplayMode.List)}
            onCancel={() => setDisplayMode(DisplayMode.Idle)}
          />
        )}
      {displayMode === DisplayMode.Delete && selected.current?.meal && (
        <Delete
          meal={selected.current.meal}
          onFinish={() => setDisplayMode(DisplayMode.List)}
          onCancel={() => setDisplayMode(DisplayMode.Idle)}
        />
      )}
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex place-content-between">
              <button
                type="button"
                onClick={() => setDate(addDays(monday, -7))}
              >
                <ArrowLeft />
              </button>
              <div>Meal Plan - {format(monday, 'MMMM')}</div>
              <button type="button" onClick={() => setDate(addDays(monday, 7))}>
                <ArrowRight />
              </button>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>
      {week.map((day) => {
        const meal = meals?.find(
          (m) => m.date === formatISO(day, { representation: 'date' }),
        );

        if (meal) {
          return (
            <Card key={String(day)}>
              <CardHeader>
                <div className="flex place-content-between">
                  <CardTitle>
                    {format(day, 'd ccc')} - {meal.recipe.name}
                  </CardTitle>
                  <ActionMenu
                    handleEdit={() => {
                      selected.current = { date: day, meal };
                      setDisplayMode(DisplayMode.Edit);
                    }}
                    handleDelete={() => {
                      selected.current = { date: day, meal };
                      setDisplayMode(DisplayMode.Delete);
                    }}
                  />
                </div>
                {meal && <CardDescription>{meal.chef.name}</CardDescription>}
              </CardHeader>
            </Card>
          );
        }

        return (
          <Card key={String(day)}>
            <CardHeader>
              <div className="flex place-content-between">
                <CardTitle>{format(day, 'd ccc')}</CardTitle>
                <AddButton
                  text="Add"
                  onClick={() => {
                    selected.current = { date: day };
                    setDisplayMode(DisplayMode.Add);
                  }}
                />
              </div>
            </CardHeader>
          </Card>
        );
      })}
    </>
  );
}
