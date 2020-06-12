import { CircularProgress } from '@material-ui/core';
import * as fbns from 'firebase';
import * as React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { UserContext } from '../contexts/UserContext';
import { State } from '../hooks/auth/State';
import { useAuth } from '../hooks/auth/useAuth';
import { useFirebase } from '../hooks/useFirebase';

type EnsureLoggedInContainerProps = {
    children: JSX.Element | JSX.Element[];
};

export function EnsureLoggedInContainer(
    props: EnsureLoggedInContainerProps,
): JSX.Element {
    const firebase: typeof fbns | null = useFirebase();
    const state: State = useAuth(firebase);

    if (firebase === null) {
        return <div>Could not authenticate, pleases try again later.</div>;
    }

    const uiConfig: firebaseui.auth.Config = {
        callbacks: {
            signInSuccessWithAuthResult: () => false,
        },
        signInFlow: 'popup',
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    };

    if (state.initializing) {
        return <CircularProgress />;
    }

    if (state.user === null) {
        return (
            <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
            />
        );
    }

    return (
        <UserContext.Provider value={state.user}>
            {props.children}
        </UserContext.Provider>
    );
}
