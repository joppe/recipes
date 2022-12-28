export interface DataLoader<T> {
  fetch(value: string): Promise<T>;
}
