import { SerializedStyles, css } from '@emotion/core';
import * as React from 'react';

import { Locale, LocaleContext } from '../containers/LocaleProvider';
import { MenuEntry } from '../services/recipes/Menu';
import { color } from '../styles/color';
import { font } from '../styles/font';
import { spacing } from '../styles/spacing';

type DetailProps = {
    active: MenuEntry | undefined;
    handleClose(): void;
    handleUpdate(entry: MenuEntry): void;
};

const detailStyles: SerializedStyles = css({
    position: 'absolute',
    left: '48px',
    top: '0',
    right: '0',
    bottom: '0',
    padding: `${spacing[2]}px`,
    backgroundColor: color.yellow.tahunaSands,
    border: `1px solid ${color.green.cuttySark}`,
});

const closeButtonStyles: SerializedStyles = css({
    position: 'absolute',
    right: `${spacing[1]}px`,
    top: `${spacing[1]}px`,
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: `${font.size[6]}px`,
    lineHeight: `${font.lineHeight[1]}`,
});

export function Detail(props: DetailProps): JSX.Element | null {
    if (props.active === undefined) {
        return null;
    }

    const locale: Locale = React.useContext(LocaleContext);
    const [title, setTitle] = React.useState(props.active.recipe.title);
    const header = `Recept voor ${props.active.date.toLocaleDateString(
        locale.locale,
        {
            weekday: 'long',
        },
    )}`;

    React.useEffect((): void => {
        setTitle((props.active as MenuEntry).recipe.title);
    }, [props.active]);

    function changeTitle(event: React.ChangeEvent<HTMLInputElement>): void {
        setTitle(event.target.value);
    }

    function save(): void {
        props.handleUpdate({
            ...(props.active as MenuEntry),
            recipe: {
                ...(props.active as MenuEntry).recipe,
                title,
            },
        });
    }

    return (
        <div css={detailStyles}>
            <h2>{header}</h2>
            <button
                type="button"
                onClick={props.handleClose}
                css={closeButtonStyles}
            >
                &times;
            </button>
            <input type="text" value={title} onChange={changeTitle} />
            <button type="button" onClick={save}>
                Save
            </button>
        </div>
    );
}
