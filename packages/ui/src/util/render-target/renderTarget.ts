const RENDER_TARGET_DATA_ATTRIBUTE = 'data-render-target';

export function renderTarget(group: string): HTMLElement {
  let renderTarget = document.querySelector<HTMLElement>(
    `[${RENDER_TARGET_DATA_ATTRIBUTE}=${group}]`,
  );

  if (renderTarget === null) {
    renderTarget = document.createElement('div');
    renderTarget.setAttribute('role', 'status');
    renderTarget.setAttribute(RENDER_TARGET_DATA_ATTRIBUTE, group);

    document.body.appendChild(renderTarget);
  }

  return renderTarget;
}
