import { SerializedStyles, css } from '@emotion/core';
import Button from '@material-ui/core/Button';
import * as React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { Detail } from '../components/Detail';
import { Layout } from '../components/Layout';
import { MenuList } from '../components/MenuList';
import { Locale, LocaleContext } from '../containers/LocaleProvider';
import { mock } from '../data/mock';
import { reducer } from '../data/reducer/menuEntries';
import { startOfDay } from '../services/date/startOfDay';
import { firebase } from '../services/firebase/firebase';
import { MenuEntry } from '../services/recipes/Menu';
import { spacing } from '../styles/spacing';

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

// Configure FirebaseUI.
const uiConfig = {
    callbacks: {
        signInSuccess(
            currentUser: firebase.User,
            credential: firebase.auth.AuthCredential,
            redirectUrl: string,
        ): void {
            console.log(currentUser);
            console.log(credential);
            console.log(redirectUrl);
        },
    },
    signInFlow: 'popup',
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
};

export default function (): JSX.Element {
    const initial: MenuEntry[] = mock(today);
    const locale: Locale = React.useContext(LocaleContext);
    const [menuItems, dispatch] = React.useReducer(reducer, initial);
    const [active, setActive] = React.useState<MenuEntry | undefined>(
        undefined,
    );
    const header = `De week van ${today.toLocaleDateString(
        locale.locale,
        todayFormatOptions,
    )}`;

    console.log(firebase.database);
    console.log(firebase.auth);

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
            <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
            />

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
            <Button>Testing</Button>
        </Layout>
    );
}
