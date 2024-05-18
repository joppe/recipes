'use client';

import { useEffect, useRef, useState } from 'react';

import { getChefs } from '@/actions/chefs';
import { Create, Delete, Edit } from '@/components/chefs';
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Chef } from '@/db/schema';

enum DisplayMode {
  List = 'list',
  Add = 'add',
  Delete = 'delete',
  Edit = 'edit',
}

export default function Chefs() {
  const selected = useRef<Chef | null>(null);
  const [displayMode, setDisplayMode] = useState<DisplayMode>(DisplayMode.List);
  const [chefs, setChefs] = useState<Chef[] | undefined>(undefined);

  useEffect(() => {
    async function fetchChefs() {
      const chefs = await getChefs();

      setChefs(chefs);
    }

    selected.current = null;

    if (displayMode === DisplayMode.List) {
      void fetchChefs();
    }
  }, [displayMode]);

  return (
    <>
      {displayMode === DisplayMode.Add && (
        <Create onFinish={() => setDisplayMode(DisplayMode.List)} />
      )}
      {displayMode === DisplayMode.Edit && selected.current && (
        <Edit
          chef={selected.current}
          onFinish={() => setDisplayMode(DisplayMode.List)}
        />
      )}
      {displayMode === DisplayMode.Delete && selected.current !== null && (
        <Delete
          chef={selected.current}
          onFinish={() => setDisplayMode(DisplayMode.List)}
        />
      )}

      <ButtonBar>
        <ButtonGroup pullRight>
          <AddButton
            text="Add Chef"
            onClick={() => setDisplayMode(DisplayMode.Add)}
          />
        </ButtonGroup>
      </ButtonBar>

      <Section>
        <Heading>
          <HeadingTitle>Chefs</HeadingTitle>
          <HeadingDescription>
            Chefs are used to indicate the quantity of a product.
          </HeadingDescription>
        </Heading>

        <DataView>
          {chefs === undefined && <Loading />}
          {chefs !== undefined && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Skill</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {chefs.map((chef) => {
                  return (
                    <TableRow key={chef.id}>
                      <TableCell className="font-medium">{chef.name}</TableCell>
                      <TableCell>{chef.skill}</TableCell>
                      <TableCell>
                        <ActionMenu
                          handleEdit={() => {
                            selected.current = chef;
                            setDisplayMode(DisplayMode.Edit);
                          }}
                          handleDelete={() => {
                            selected.current = chef;
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
        {chefs !== undefined && (
          <DataStats>
            <strong>{chefs.length}</strong> products
          </DataStats>
        )}
      </Section>
    </>
  );
}
