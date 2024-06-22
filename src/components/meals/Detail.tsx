import { format } from 'date-fns';

import { Ingredients } from './Ingredients';
import { Instructions } from './Instructions';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogMain,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Meal } from '@/db/schema';

type DetailProps = {
  meal: Meal;
};

export function Detail({ meal }: DetailProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          {meal.recipe.name} by {meal.chef.name}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{meal.recipe.name}</DialogTitle>
          <DialogDescription>
            By {meal.chef.name} on {format(meal.date, 'EEEE d MMMM yyyy')}
            {meal.score && (
              <>
                <br />
                <p>Score {meal.score}</p>
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogMain>
          <Tabs defaultValue="instructions" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="instructions">Instructions</TabsTrigger>
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            </TabsList>
            <TabsContent value="instructions">
              <div className="grid gap-4 py-4">
                <Instructions instructions={meal.recipe.instructions} />
              </div>
            </TabsContent>

            <TabsContent value="ingredients">
              <div className="grid gap-4 py-4">
                <Ingredients ingredients={meal.recipe.ingredients} />
              </div>
            </TabsContent>
          </Tabs>
        </DialogMain>
      </DialogContent>
    </Dialog>
  );
}
