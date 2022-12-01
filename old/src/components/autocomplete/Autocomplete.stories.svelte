<script lang="ts">
  import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

  import Autocomplete from './Autocomplete.svelte';
  import { MockDataSource } from './MockDataSource';
  import { RestDataSource } from './RestDataSource';

  // let ds = new MockDataSource();
  type Response = {
    id: number;
    title: string;
    userId: number;
    completed: boolean;
  }[];
  let ds = new RestDataSource<Response>(
    'https://jsonplaceholder.typicode.com/todos',
    (response: Response) => {
      return response.map((item) => {
        return {
          id: String(item.id),
          label: item.title,
        };
      });
    },
  );
</script>

<Meta title="Autocomplete" component={Autocomplete} />

<Template let:args>
  <div class="container">
    <Autocomplete min={3} {ds} />
  </div>
</Template>

<Story name="Default" args={{ rounded: true }} />
