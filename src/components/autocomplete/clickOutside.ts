export function clickOutside(
  element: HTMLElement,
  callback: () => void,
): () => void {
  function handleClick(event: MouseEvent): void {
    if (event.target !== null && element.contains(event.target as Node)) {
      callback();
    }
  }

  document.body.addEventListener('click', handleClick);

  return () => {
    document.body.removeEventListener('click', handleClick);
  };
}
