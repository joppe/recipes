import { DataLoader } from '../../../util/data-loader/DataLoader';
import { DataLoaderResponse } from '../types/DataLoaderResponse';
import { data } from './data';

export class ProductLoader implements DataLoader<DataLoaderResponse> {
  public async fetch(value: string): Promise<DataLoaderResponse> {
    const options = data.filter(
      (item) => item.text.toLowerCase().indexOf(value.toLowerCase()) > -1,
    );

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          value,
          options,
        });
      }, 500);
    });
  }
}
