import * as React from 'react';

type HeaderProps = {
    headerText: string;
}

export function Header(props: HeaderProps) {
    return (
        <h1>{props.headerText}</h1>
    )
}
