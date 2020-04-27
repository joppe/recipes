import * as React from 'react';
import { css, jsx, SerializedStyles } from '@emotion/core';

import { weekDays } from '../services/date/weekDays';
import { Menu, MenuEntry } from '../services/recipes/Menu';
import { Layout } from '../components/Layout';

const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
};
const locale: string = 'nl-NL';
const days: Date[] = weekDays(new Date());
const menu: Menu = {
    days: [
        {
            date: days[0],
            recipe: {
                title: 'Nachos Todos',
            },
        },
        {
            date: days[1],
            recipe: {
                title: 'Tomaten groente soep',
            },
        },
        {
            date: days[2],
            recipe: {
                title: 'Nasi',
            },
        },
        {
            date: days[3],
            recipe: {
                title: 'Risotto',
            },
        },
        {
            date: days[4],
            recipe: {
                title: 'Bietensalade',
            },
        },
        {
            date: days[5],
            recipe: {
                title: 'Brocoli taart',
            },
        },
        {
            date: days[6],
            recipe: {
                title: 'Lasagne',
            },
        },
    ],
};

const orderedListStyle: SerializedStyles = css({
    margin: 0,
    padding: 0,
    listStyle: 'none',
    color: 'green',
});

export default function(): JSX.Element {
    return (
        <Layout>
            <ol css={orderedListStyle}>
                {menu.days.map(
                    (menuEntry: MenuEntry): JSX.Element => {
                        return (
                            <li key={menuEntry.date.getTime()}>
                                {menuEntry.date.toLocaleDateString(
                                    locale,
                                    options,
                                )}
                                : {menuEntry.recipe.title}
                            </li>
                        );
                    },
                )}
            </ol>
        </Layout>
    );
}
