import mockData from './mock.json';
import type { DataSource, Result } from './DataSource';

export class MockDataSource implements DataSource {
  private stop = false;

  async fetch(value: string): Promise<Result[]> {
    this.stop = false;

    const result = mockData.recipes
      .filter((recipe) => {
        return recipe.name.includes(value);
      })
      .map((recipe) => {
        return {
          id: recipe.id,
          label: recipe.name,
        };
      });

    return new Promise((resolve) => {
      window.setTimeout(() => {
        resolve(result);
      }, 500);
    });
  }

  cancel(): void {
    this.stop = true;
  }
}
