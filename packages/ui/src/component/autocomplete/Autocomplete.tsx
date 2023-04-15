import { createPortal } from 'react-dom';

import { DataLoader } from '../../types';
import { renderTarget } from '../../util/render-target';

import { Input } from './Input';
import { Options } from './Options';
import { AutocompleteContextProvider } from './context/AutocompleteContext';
import { DataLoaderResponse } from './types/DataLoaderResponse';

export type AutocompleteProps = {
  name: string;
  minLength?: 2;
  dataLoader: DataLoader<DataLoaderResponse>;
};

export function Autocomplete({
  name,
  dataLoader,
  minLength = 2,
}: AutocompleteProps): JSX.Element {
  return (
    <AutocompleteContextProvider dataLoader={dataLoader} minLength={minLength}>
      <Input name={name} />
      {createPortal(<Options />, renderTarget('autocomplete'))}
    </AutocompleteContextProvider>
  );
}
