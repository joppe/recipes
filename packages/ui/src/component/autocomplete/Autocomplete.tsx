import { createPortal } from 'react-dom';

import { DataLoader } from '../../util/data-loader/DataLoader';
import { renderTarget } from '../../util/render-target/renderTarget';
import { AutocompleteContextProvider } from './context/AutocompleteContext';
import { Input } from './Input';
import { Options } from './Options';
import { DataLoaderResponse } from './types/DataLoaderResponse';

export interface AutocompleteProps {
  minLength?: 2;
  dataLoader: DataLoader<DataLoaderResponse>;
}

export const Autocomplete = ({
  dataLoader,
  minLength = 2,
}: AutocompleteProps) => {
  return (
    <AutocompleteContextProvider dataLoader={dataLoader} minLength={minLength}>
      <Input />
      {createPortal(<Options />, renderTarget('autocomplete'))}
    </AutocompleteContextProvider>
  );
};
