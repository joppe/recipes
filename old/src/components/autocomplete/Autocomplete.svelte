<script lang="ts">
  import type { DataSource, Result } from './DataSource';

  export let min = 2;
  export let ds: DataSource;

  let hasSearched = false;
  let isSearching = false;
  let options: Result[] = [];
  let id: string | undefined = undefined;
  let value = '';

  function selectOption(option: Result) {
    value = option.label;
    id = option.id;
  }

  function handleInput(event: KeyboardEvent) {
    const search = (event.target as HTMLInputElement).value;

    id = undefined;

    if (search.length >= min) {
      hasSearched = true;
      isSearching = true;

      ds.fetch(search).then((results) => {
        isSearching = false;
        options = results;
      });
    } else {
      hasSearched = false;
      isSearching = false;
    }
  }
</script>

<div class="mb-3">
  <input type="hidden" bind:value={id} />
  <input type="text" class="form-control" bind:value on:input={handleInput} />
  {#if isSearching}
    <span>Loading...</span>
  {:else}
    {#if hasSearched && options.length === 0}
      <span>Nothing found</span>
    {/if}
    {#if hasSearched && options.length > 0}
      <ul>
        {#each options as option}
          <li on:click={() => selectOption(option)}>{option.label}</li>
        {/each}
      </ul>
    {/if}
  {/if}
</div>
