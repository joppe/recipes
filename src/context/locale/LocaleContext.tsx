import * as React from 'react';

import { Locale } from './Locale';

export const LocaleContext: React.Context<Locale> = React.createContext<Locale>(
    {
        locale: 'en-EN',
    },
);
