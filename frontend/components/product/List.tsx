import { useEffect } from 'react';
import { CgPen, CgTrash } from 'react-icons/cg';

import { useQuery } from '@apollo/client';

import { Button } from '@recipes/ui/component/form';

import { Product } from '../../gql/graphql';
import { states } from '../crud/context/config';
import { useIsState } from '../crud/context/useIsState';
import { useStateContext } from '../crud/context/useStateContext';
import { ListShell } from '../crud/list/ListShell';
import { Table } from '../table/Table';

import { productsQuery } from './gql/products.query';

export function List(): JSX.Element {
  const { remove, edit, success } = useStateContext();
  const shouldRefetch = useIsState(states.REFRESH);
  const { data, loading, error, refetch } = useQuery(productsQuery);

  useEffect(() => {
    if (shouldRefetch) {
      refetch();
      success();
    }
  }, [shouldRefetch, refetch, success]);

  return (
    <ListShell<Product>
      loading={loading}
      error={error}
      items={data?.products}
      view={(products) => (
        <Table
          head={
            <>
              <Table.Header>Name</Table.Header>
              <Table.Header>Actions</Table.Header>
            </>
          }
        >
          {products.map((product) => {
            return (
              <tr key={product.id} className="border-b">
                <td className="px-6 py-4">{product.name}</td>
                <td className="flex gap-2 px-6 py-4">
                  <Button type="button" onClick={() => edit(product.id)} icon>
                    <CgPen />
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => remove(product.id)}
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
