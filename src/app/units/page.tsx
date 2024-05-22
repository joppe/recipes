'use client';

import { useEffect, useRef, useState } from 'react';

import { getUnits } from '@/actions/units';
import { ActionMenu } from '@/components/layout/action-menu';
import {
  AddButton,
  ButtonBar,
  ButtonGroup,
} from '@/components/layout/button-bar';
import { Loading } from '@/components/layout/loading/Loading';
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
import { Create, Delete, Edit } from '@/components/units';
import { Unit } from '@/db/schema';

enum DisplayMode {
  Idle = 'idle',
  List = 'list',
  Add = 'add',
  Delete = 'delete',
  Edit = 'edit',
}

export default function Units() {
  const selected = useRef<Unit | null>(null);
  const [displayMode, setDisplayMode] = useState<DisplayMode>(DisplayMode.List);
  const [units, setUnits] = useState<Unit[] | undefined>(undefined);

  useEffect(() => {
    async function fetchUnits() {
      const units = await getUnits();

      setUnits(units);
      setDisplayMode(DisplayMode.Idle);
    }

    selected.current = null;

    if (displayMode === DisplayMode.List) {
      void fetchUnits();
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
          unit={selected.current}
          onFinish={() => setDisplayMode(DisplayMode.List)}
          onCancel={() => setDisplayMode(DisplayMode.Idle)}
        />
      )}
      {displayMode === DisplayMode.Delete && selected.current !== null && (
        <Delete
          unit={selected.current}
          onFinish={() => setDisplayMode(DisplayMode.List)}
          onCancel={() => setDisplayMode(DisplayMode.Idle)}
        />
      )}

      <ButtonBar>
        <ButtonGroup pullRight>
          <AddButton
            text="Add Unit"
            onClick={() => setDisplayMode(DisplayMode.Add)}
          />
        </ButtonGroup>
      </ButtonBar>

      <Card>
        <CardHeader>
          <CardTitle>Units</CardTitle>
          <CardDescription>
            Units are used to indicate the quantity of a product.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {units === undefined && <Loading />}
          {units !== undefined && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Abbreviation</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {units.map((unit) => {
                  return (
                    <TableRow key={unit.id}>
                      <TableCell className="font-medium">{unit.name}</TableCell>
                      <TableCell>{unit.abbreviation}</TableCell>
                      <TableCell>
                        <ActionMenu
                          handleEdit={() => {
                            selected.current = unit;
                            setDisplayMode(DisplayMode.Edit);
                          }}
                          handleDelete={() => {
                            selected.current = unit;
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
