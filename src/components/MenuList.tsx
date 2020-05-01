import * as React from 'react';
import { css, SerializedStyles } from '@emotion/core';

import { MenuEntry } from '../services/recipes/Menu';
import { MenuListItem } from './MenuListItem';

type MenuListProps = {
    active: MenuEntry | undefined;
    items: MenuEntry[];
    setActive(item: MenuEntry): void;
};

// tslint:disable-next-line function-name
export function MenuList(props: MenuListProps): JSX.Element {
    const orderedListStyle: SerializedStyles = css({
        margin: 0,
        padding: 0,
        listStyle: 'none',
        color: 'green',
    });

    return (
        <ol css={orderedListStyle}>
            {props.items.map(
                (menuEntry: MenuEntry, index: number): JSX.Element => {
                    const isActive: boolean = menuEntry === props.active;
                    const key: number = menuEntry.date.getTime();

                    return (
                        <MenuListItem
                            key={key}
                            isActive={isActive}
                            menuEntry={menuEntry}
                            handleClick={props.setActive}
                        />
                    );
                },
            )}
        </ol>
    );
}
