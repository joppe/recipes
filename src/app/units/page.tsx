'use client';

import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { getUnits } from '@/actions/units';
import {
  Heading,
  HeadingDescription,
  HeadingTitle,
} from '@/components/layout/heading';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CreateUnit } from '@/components/units/CreateUnit';
import { DeleteUnit } from '@/components/units/DeleteUnit';
import { Unit } from '@/db/schema';

enum DisplayMode {
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
    }

    selected.current = null;

    if (displayMode === DisplayMode.List) {
      void fetchUnits();
    }
  }, [displayMode]);

  return (
    <>
      {displayMode === DisplayMode.Add && (
        <CreateUnit onFinish={() => setDisplayMode(DisplayMode.List)} />
      )}
      {displayMode === DisplayMode.Delete && selected.current !== null && (
        <DeleteUnit
          unit={selected.current}
          onFinish={() => setDisplayMode(DisplayMode.List)}
        />
      )}
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <Button
            size="sm"
            className="h-8 gap-1"
            onClick={() => setDisplayMode(DisplayMode.Add)}
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Unit
            </span>
          </Button>
        </div>
      </div>

      <section className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <Heading>
          <HeadingTitle>Units</HeadingTitle>
          <HeadingDescription>
            Units are used to indicate the quantity of a product.
          </HeadingDescription>
        </Heading>

        <div className="p-6 pt-0">
          <div className="relative w-full overflow-auto">
            {units === undefined && (
              <div className="flex items-center justify-center h-64">
                <span className="text-muted-foreground">Loading...</span>
              </div>
            )}
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
                        <TableCell className="font-medium">
                          {unit.name}
                        </TableCell>
                        <TableCell>{unit.abbreviation}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                aria-haspopup="true"
                                size="icon"
                                variant="ghost"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Toggle menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  selected.current = unit;
                                  setDisplayMode(DisplayMode.Delete);
                                }}
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
        {units !== undefined && (
          <div className="flex items-center p-6 pt-0">
            <div className="text-xs text-muted-foreground">
              <strong>{units.length}</strong> products
            </div>
          </div>
        )}
      </section>
    </>
  );
}
