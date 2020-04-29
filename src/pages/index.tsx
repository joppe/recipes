import * as React from 'react';
import { css, SerializedStyles } from '@emotion/core';

import { weekDays } from '../services/date/weekDays';
import { Menu, MenuEntry } from '../services/recipes/Menu';
import { Layout } from '../components/Layout';
import { color } from '../styles/color';
import { spacing } from '../styles/spacing';
import { font } from '../styles/font';
import { startOfDay } from '../services/date/startOfDay';

const weekDayFormatOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
};
const todayFormatOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
};
const locale: string = 'nl-NL';
const today: Date = startOfDay(new Date());
const days: Date[] = weekDays(today);
const dummy: MenuEntry[] = [
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
];

const orderedListStyle: SerializedStyles = css({
    margin: 0,
    padding: 0,
    listStyle: 'none',
    color: 'green',
});

const menuEntryStyle: SerializedStyles = css({
    display: 'flex',
    marginBottom: `${spacing[3]}px`,
    alignItems: 'center',
    backgroundColor: color.yellow.tahunaSands,
});

const menuEntrySelectedStyle: SerializedStyles = css({
    backgroundColor: color.green.smoke,
});

const weekDayStyle: SerializedStyles = css({
    display: 'block',
    padding: `${spacing[1]}px`,
    width: '50px',
    backgroundColor: color.green.cuttySark,
    textTransform: 'uppercase',
    fontSize: `${font.size[4]}px`,
    textAlign: 'center',
    color: color.yellow.tahunaSands,
    fontWeight: 'bold',
});

const recipeTitleStyle: SerializedStyles = css({
    paddingLeft: `${spacing[3]}px`,
    width: '100%',
    fontSize: `${font.size[4]}px`,
    color: color.red.fireBrick,
})

export default function(): JSX.Element {
    const [dd, setDays] = React.useState<MenuEntry[]>(dummy);
    const [active, setActive] = React.useState<number | undefined>(undefined);

    function handleClick(index: number): void {
        setActive(index)
    }

    return (
        <Layout>
            <h1>De week van {today.toLocaleDateString(locale, todayFormatOptions)}</h1>

            <ol css={orderedListStyle}>
                {dd.map(
                    (menuEntry: MenuEntry, index: number): JSX.Element => {
                        const styles: SerializedStyles[] = [menuEntryStyle];

                        if (active === index) {
                            console.log(active, index);
                            styles.push(menuEntrySelectedStyle);
                        }

                        return (
                            <li key={menuEntry.date.getTime()} css={styles} onClick={() => handleClick(index)} role="dialog">
                                <span css={weekDayStyle}>{menuEntry.date.toLocaleDateString(
                                    locale,
                                    weekDayFormatOptions,
                                )}</span>
                                <span css={recipeTitleStyle}>{menuEntry.recipe.title}</span>
                            </li>
                        );
                    },
                )}
            </ol>
        </Layout>
    );
}
