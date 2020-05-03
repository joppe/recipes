import * as React from 'react';

export type Locale = {
    locale: string;
};

type LocaleProviderProps = {
    children: JSX.Element | JSX.Element[];
};

const data: Locale = {
    locale: 'nl-NL',
};

export const LocaleContext: React.Context<Locale> = React.createContext<Locale>(
    data,
);

// tslint:disable-next-line function-name
export function LocaleProvider(props: LocaleProviderProps): JSX.Element {
    return (
        <LocaleContext.Provider value={data}>
            {props.children}
        </LocaleContext.Provider>
    );
}
