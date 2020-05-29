import { SerializedStyles, css } from '@emotion/core';
import * as React from 'react';

import { MenuEntry } from '../services/recipes/Menu';
import { MenuListItem } from './MenuListItem';

type MenuListProps = {
    active: MenuEntry | undefined;
    items: MenuEntry[];
    setActive(item: MenuEntry): void;
};

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
                (menuEntry: MenuEntry): JSX.Element => {
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
