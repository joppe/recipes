import * as React from 'react';

import { weekDays } from '../services/date/weekDays';
import { Menu, MenuEntry } from '../services/recipes/Menu';

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

export default function(): JSX.Element {
    return (
        <div>
            <ol>
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
        </div>
    );
}
