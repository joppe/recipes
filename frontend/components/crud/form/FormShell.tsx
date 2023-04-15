import { ReactNode } from 'react';

import { Loading } from '../../loading/Loading';

export type FormShellProps = {
  loading: boolean;
  error: string | undefined;
  form: ReactNode;
};

export function FormShell({ loading, error, form }: FormShellProps) {
  return (
    <>
      {loading && <Loading />}
      {error && <p className="text-red-600">An error occurred</p>}
      <div className="px-6">{form}</div>
    </>
  );
}
