import { useRef, useState } from 'react';

import { ActionMenu } from '@/components/layout/action-menu';
import {
  AddButton,
  ButtonBar,
  ButtonGroup,
} from '@/components/layout/button-bar';
import { Create, Delete, Edit } from '@/components/recipes/ingredients';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Ingredient, Product, Recipe, Unit } from '@/db/schema';

type EmbedProps = {
  recipe: Recipe;
  products: Product[];
  units: Unit[];
  onFinish: () => void;
  onCancel: () => void;
};

enum DisplayMode {
  List = 'list',
  Add = 'add',
  Delete = 'delete',
  Edit = 'edit',
}

function getUnit(id: number, units: Unit[]): Unit | undefined {
  return units.find((unit) => unit.id === id);
}

function getProduct(id: number, products: Product[]): Product | undefined {
  return products.find((product) => product.id === id);
}

export function Embed({
  recipe,
  products,
  units,
  onFinish,
  onCancel,
}: EmbedProps) {
  const selected = useRef<Ingredient | null>(null);
  const [displayMode, setDisplayMode] = useState<DisplayMode>(DisplayMode.List);

  return (
    <>
      {displayMode === DisplayMode.Add && (
        <Create
          recipeId={recipe.id}
          products={products}
          units={units}
          onFinish={() => {
            setDisplayMode(DisplayMode.List);
            onFinish();
          }}
          onCancel={() => {
            setDisplayMode(DisplayMode.List);
            onCancel();
          }}
        />
      )}
      {displayMode === DisplayMode.Edit && selected.current && (
        <Edit
          ingredient={selected.current}
          products={products}
          units={units}
          onFinish={() => {
            setDisplayMode(DisplayMode.List);
            onFinish();
          }}
          onCancel={() => {
            setDisplayMode(DisplayMode.List);
            onCancel();
          }}
        />
      )}
      {displayMode === DisplayMode.Delete && selected.current && (
        <Delete
          ingredient={selected.current}
          onFinish={() => {
            setDisplayMode(DisplayMode.List);
            onFinish();
          }}
          onCancel={() => {
            setDisplayMode(DisplayMode.List);
            onCancel();
          }}
        />
      )}

      <ButtonBar>
        <ButtonGroup pullRight>
          <AddButton
            text="Add Ingredient"
            onClick={() => setDisplayMode(DisplayMode.Add)}
          />
        </ButtonGroup>
      </ButtonBar>

      <Card>
        <CardHeader>
          <CardTitle>Ingredients</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ingredient</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recipe.ingredients?.map((ingredient) => {
                return (
                  <TableRow key={ingredient.id}>
                    <TableCell className="font-medium">
                      {ingredient.quantity}{' '}
                      {getUnit(ingredient.unitId, units)?.abbreviation}{' '}
                      {getProduct(
                        ingredient.productId,
                        products,
                      )?.name.toLowerCase()}
                    </TableCell>
                    <TableCell>
                      <ActionMenu
                        handleEdit={() => {
                          selected.current = ingredient;
                          setDisplayMode(DisplayMode.Edit);
                        }}
                        handleDelete={() => {
                          selected.current = ingredient;
                          setDisplayMode(DisplayMode.Delete);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
