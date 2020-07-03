import * as React from 'react';

import { Locale } from '../context/locale/Locale';
import { LocaleContext } from '../context/locale/LocaleContext';

export function useLocale(): Locale {
    return React.useContext<Locale>(LocaleContext);
}
