export type Result = {
  id: string;
  label: string;
};

export interface DataSource {
  fetch(value: string): Promise<Result[]>;

  cancel(): void;
}
