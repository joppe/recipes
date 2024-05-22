'use client';

import { addDays, format, startOfWeek } from 'date-fns';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { getChefs } from '@/actions/chefs';
import { getRecipes } from '@/actions/recipes';
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
  const selected = useRef<Selected | null>(null);
  const [displayMode, setDisplayMode] = useState<DisplayMode>(DisplayMode.List);
  const [chefs, setChefs] = useState<Chef[] | undefined>(undefined);
  const [recipes, setRecipes] = useState<Recipe[] | undefined>(undefined);
  const [date, setDate] = useState(new Date());
  const monday = startOfWeek(date, { weekStartsOn: 1 });
  const week = Array.from({ length: 7 }, (_, i) => {
    return addDays(monday, i);
  });
  const loading = chefs === undefined || recipes === undefined;

  useEffect(() => {
    async function fetchAll() {
      const chefs = await getChefs();
      const recipes = await getRecipes();

      setChefs(chefs);
      setRecipes(recipes);
    }

    void fetchAll();
  }, []);

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
        return (
          <Card key={String(day)}>
            <CardHeader>
              <div className="flex place-content-between">
                <CardTitle>
                  {format(day, 'd ccc')} - Spaghetti Bolognese
                </CardTitle>
                <AddButton
                  text="Add"
                  onClick={() => {
                    selected.current = { date: day };
                    setDisplayMode(DisplayMode.Add);
                  }}
                />
              </div>
              <CardDescription>Joppe</CardDescription>
            </CardHeader>
          </Card>
        );
      })}
    </>
  );
}
