import type { DataSource, Result } from './DataSource';

type Mapper<T> = (response: T) => Result[];

export class RestDataSource<T> implements DataSource {
  private controller: AbortController | undefined;
  private readonly url: string;
  private readonly mapper: Mapper<T>;

  public constructor(url: string, mapper: Mapper<T>) {
    this.url = url;
    this.mapper = mapper;
  }

  async fetch(value: string): Promise<Result[]> {
    const url = `${this.url}?search=${value}`;
    const headers = new Headers();
    headers.append('Content-type', 'application/json');
    const request = new Request(url, {
      method: 'GET',
      headers,
      mode: 'cors',
      cache: 'default',
    });

    this.controller = new AbortController();

    return fetch(request, {
      signal: this.controller.signal,
    })
      .then((response) => response.json())
      .then((json: T): Result[] => {
        this.controller = undefined;

        return this.mapper(json);
      });
  }

  cancel(): void {
    if (this.controller === undefined) {
      return;
    }

    this.controller.abort();
  }
}
