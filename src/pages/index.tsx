import * as React from 'react';
import { css, SerializedStyles } from '@emotion/core';

import { MenuEntry } from '../services/recipes/Menu';
import { Layout } from '../components/Layout';
import { startOfDay } from '../services/date/startOfDay';
import { Detail } from '../components/Detail';
import { MenuList } from '../components/MenuList';
import { mock } from '../data/mock';
import { reducer } from '../data/reducer/menuEntries';
import { spacing } from '../styles/spacing';
import { Locale, LocaleContext } from '../containers/LocaleProvider';

const todayFormatOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
};
const today: Date = startOfDay(new Date());

const containerStyles: SerializedStyles = css({
    position: 'relative',
});

const titleStyles: SerializedStyles = css({
    paddingBottom: `${spacing[2]}px`,
});

export default function(): JSX.Element {
    const initial: MenuEntry[] = mock(today);
    const locale: Locale = React.useContext(LocaleContext);
    const [menuItems, dispatch] = React.useReducer(reducer, initial);
    const [active, setActive] = React.useState<MenuEntry | undefined>(
        undefined,
    );
    const header: string = `De week van ${today.toLocaleDateString(
        locale.locale,
        todayFormatOptions,
    )}`;

    function handleUpdate(menuEntry: MenuEntry): void {
        dispatch({
            type: 'update',
            payload: menuEntry,
        });

        setActive(undefined);
    }

    function handleClose(): void {
        setActive(undefined);
    }

    return (
        <Layout>
            <h1 css={titleStyles}>{header}</h1>

            <div css={containerStyles}>
                <MenuList
                    active={active}
                    items={menuItems}
                    setActive={setActive}
                />

                <Detail
                    active={active}
                    handleUpdate={handleUpdate}
                    handleClose={handleClose}
                />
            </div>
        </Layout>
    );
}
