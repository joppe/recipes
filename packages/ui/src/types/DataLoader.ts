export type DataLoader<T> = {
  fetch(value: string): Promise<T>;
};
