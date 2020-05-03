import * as React from 'react';
import { css, SerializedStyles } from '@emotion/core';

import { MenuEntry } from '../services/recipes/Menu';
import { spacing } from '../styles/spacing';
import { color } from '../styles/color';
import { font } from '../styles/font';
import { Locale, LocaleContext } from '../containers/LocaleProvider';

type MenuListItemProps = {
    isActive: boolean;
    menuEntry: MenuEntry;
    handleClick(menuEntry: MenuEntry): void;
};

const listItemStyle: SerializedStyles = css({
    display: 'flex',
    marginBottom: `${spacing[3]}px`,
    alignItems: 'center',
    backgroundColor: color.yellow.tahunaSands,
    border: `1px solid ${color.green.cuttySark}`,
    cursor: 'pointer',
});

const weekDayStyle: SerializedStyles = css({
    display: 'block',
    padding: `${spacing[2]}px`,
    width: '50px',
    backgroundColor: color.green.cuttySark,
    textTransform: 'uppercase',
    fontSize: `${font.size[4]}px`,
    textAlign: 'center',
    color: color.yellow.tahunaSands,
    fontWeight: 'bold',
});

const weekDaySelectedStyle: SerializedStyles = css({
    position: 'relative',
    backgroundColor: color.yellow.tahunaSands,
    color: color.green.cuttySark,
    ':after': {
        content: '""',
        position: 'absolute',
        zIndex: 1,
        right: '0',
        top: '0',
        width: '1px',
        height: '100%',
        backgroundColor: color.yellow.tahunaSands,
    },
});

const recipeTitleStyle: SerializedStyles = css({
    paddingLeft: `${spacing[3]}px`,
    width: '100%',
    fontSize: `${font.size[4]}px`,
    color: color.red.fireBrick,
});

// tslint:disable-next-line function-name
export function MenuListItem(props: MenuListItemProps): JSX.Element {
    const styles: SerializedStyles[] = [weekDayStyle];
    const locale: Locale = React.useContext(LocaleContext);
    const weekDay: string = props.menuEntry.date.toLocaleDateString(
        locale.locale,
        {
            weekday: 'short',
        },
    );

    if (props.isActive) {
        styles.push(weekDaySelectedStyle);
    }

    function handleClick(): void {
        props.handleClick(props.menuEntry);
    }

    return (
        <li css={listItemStyle} onClick={handleClick} role="dialog">
            <span css={styles}>{weekDay}</span>
            <span css={recipeTitleStyle}>{props.menuEntry.recipe.title}</span>
        </li>
    );
}
