import { ReactNode } from 'react';

import { ApolloError } from '@apollo/client';

import { Loading } from '../../loading/Loading';

export type ListShellProps<T> = {
  loading: boolean;
  error: ApolloError | undefined;
  items: T[] | undefined;
  view: (items: T[]) => ReactNode;
};

export function ListShell<T>({
  loading,
  error,
  items,
  view,
}: ListShellProps<T>): JSX.Element {
  return (
    <>
      {loading && <Loading />}
      {error && <p className="text-red-600">An error occurred</p>}
      {!loading && !error && items?.length === 0 && (
        <p>There are no entries found.</p>
      )}
      {items?.length && view(items)}
    </>
  );
}
