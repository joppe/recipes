import { useEffect } from 'react';
import { CgPen, CgTrash } from 'react-icons/cg';

import { useQuery } from '@apollo/client';

import { Button } from '@recipes/ui/component/form';

import { Unit } from '../../gql/graphql';
import { states } from '../crud/context/config';
import { useIsState } from '../crud/context/useIsState';
import { useStateContext } from '../crud/context/useStateContext';
import { ListShell } from '../crud/list/ListShell';
import { Table } from '../table/Table';

import { unitsQuery } from './gql/units.query';

export function List(): JSX.Element {
  const { remove, edit, success } = useStateContext();
  const shouldRefetch = useIsState(states.REFRESH);
  const { data, loading, error, refetch } = useQuery(unitsQuery);

  useEffect(() => {
    if (shouldRefetch) {
      refetch();
      success();
    }
  }, [shouldRefetch, refetch]);

  return (
    <ListShell<Unit>
      loading={loading}
      error={error}
      items={data?.units}
      view={(units) => (
        <Table
          head={
            <>
              <Table.Header>Name</Table.Header>
              <Table.Header>Abbreviation</Table.Header>
              <Table.Header>Actions</Table.Header>
            </>
          }
        >
          {units.map((unit) => {
            return (
              <tr key={unit.id} className="border-b">
                <td className="px-6 py-4">{unit.name}</td>
                <td className="px-6 py-4">{unit.abbreviation}</td>
                <td className="flex gap-2 px-6 py-4">
                  <Button type="button" onClick={() => edit(unit.id)} icon>
                    <CgPen />
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => remove(unit.id)}
                    icon
                  >
                    <CgTrash />
                  </Button>
                </td>
              </tr>
            );
          })}
        </Table>
      )}
    ></ListShell>
  );
}
