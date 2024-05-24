import { useRef, useState } from 'react';

import { ActionMenu } from '@/components/layout/action-menu';
import {
  AddButton,
  ButtonBar,
  ButtonGroup,
} from '@/components/layout/button-bar';
import { Create, Delete, Edit } from '@/components/recipes/instructions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Instruction, Recipe } from '@/db/schema';

type EmbedProps = {
  recipe: Recipe;
  onFinish: () => void;
  onCancel: () => void;
};

enum DisplayMode {
  List = 'list',
  Add = 'add',
  Delete = 'delete',
  Edit = 'edit',
}

export function Embed({ recipe, onFinish, onCancel }: EmbedProps) {
  const selected = useRef<Instruction | null>(null);
  const [displayMode, setDisplayMode] = useState<DisplayMode>(DisplayMode.List);

  return (
    <>
      {displayMode === DisplayMode.Add && (
        <Create
          recipeId={recipe.id}
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
          instruction={selected.current}
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
          instruction={selected.current}
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
            text="Add Instruction"
            onClick={() => setDisplayMode(DisplayMode.Add)}
          />
        </ButtonGroup>
      </ButtonBar>

      <Card>
        <CardHeader>
          <CardTitle>Instructions</CardTitle>
        </CardHeader>

        <CardContent>
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
                          selected.current = instruction;
                          setDisplayMode(DisplayMode.Edit);
                        }}
                        handleDelete={() => {
                          selected.current = instruction;
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
