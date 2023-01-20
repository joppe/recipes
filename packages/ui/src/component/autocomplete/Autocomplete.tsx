import { createPortal } from 'react-dom';

import { Input } from './Input';
import { Options } from './Options';
import { AutocompleteContextProvider } from './context/AutocompleteContext';
import { DataLoaderResponse } from './types/DataLoaderResponse';

import { DataLoader } from '../../types';
import { renderTarget } from '../../util/render-target';

export interface AutocompleteProps {
  name: string;
  minLength?: 2;
  dataLoader: DataLoader<DataLoaderResponse>;
}

export const Autocomplete = ({
  name,
  dataLoader,
  minLength = 2,
}: AutocompleteProps) => {
  return (
    <AutocompleteContextProvider dataLoader={dataLoader} minLength={minLength}>
      <Input name={name} />
      {createPortal(<Options />, renderTarget('autocomplete'))}
    </AutocompleteContextProvider>
  );
};
