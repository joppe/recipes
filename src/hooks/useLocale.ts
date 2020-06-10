import * as React from 'react';

import { Locale } from '../contexts/locale/Locale';
import { LocaleContext } from '../contexts/locale/LocaleContext';

export function useLocale(): Locale {
    return React.useContext(LocaleContext);
}
