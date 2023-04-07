import { ReactNode } from 'react';

import { Loading } from '../../loading/Loading';
import { CRUDHeader } from '../CRUDHeader';
import { CRUDLayout } from '../CRUDLayout';

type CRUDNewFormProps = {
  loading: boolean;
  error: string | undefined;
  children: ReactNode;
  form: ReactNode;
};

export function CRUDNewForm({
  loading,
  error,
  children,
  form,
}: CRUDNewFormProps) {
  return (
    <CRUDLayout>
      <CRUDHeader>{children}</CRUDHeader>

      {loading && <Loading />}
      {error && <p className="text-red-600">An error occured</p>}
      <div className="px-6">{form}</div>
    </CRUDLayout>
  );
}
