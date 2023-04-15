import { useEffect, useState } from 'react';

import { useStateContext } from './useStateContext';

export function useIsState(checkState: string): boolean {
  const context = useStateContext();
  const [isState, setIsState] = useState(context.getState() === checkState);

  useEffect(() => {
    return context.listen((_: string, state: string) => {
      const newIsState = state === checkState;

      if (newIsState === isState) {
        return;
      }

      setIsState(newIsState);
    });
  }, [checkState, isState, context]);

  return isState;
}
