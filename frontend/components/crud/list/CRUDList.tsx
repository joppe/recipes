import { ReactNode } from 'react';

import { ApolloError } from '@apollo/client';

import { Loading } from '../../loading/Loading';
import { CRUDHeader } from '../CRUDHeader';
import { CRUDLayout } from '../CRUDLayout';

type CRUDListProps<T> = {
  loading: boolean;
  error: ApolloError | undefined;
  items: T[] | undefined;
  children: ReactNode;
  view: (items: T[]) => ReactNode;
};

export function CRUDList<T>({
  loading,
  error,
  items,
  children,
  view,
}: CRUDListProps<T>) {
  return (
    <CRUDLayout>
      <CRUDHeader>{children}</CRUDHeader>

      {loading && <Loading />}
      {error && <p className="text-red-600">An error occured</p>}
      {!loading && !error && items?.length === 0 && (
        <p>There are no entries found.</p>
      )}
      {items?.length && view(items)}
    </CRUDLayout>
  );
}
