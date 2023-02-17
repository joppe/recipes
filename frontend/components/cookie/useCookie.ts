import { useContext } from 'react';

import { CookieContextValue } from './CookieContextValue';
import { CookieContext } from './CookieProvider';

export function useCookie(): CookieContextValue {
  const value = useContext(CookieContext);

  if (value === null) {
    throw new Error('Unable to find context provider for CookieContext');
  }

  return value;
}
