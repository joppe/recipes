import { CircularProgress } from '@material-ui/core';
import * as React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { UserContext } from '../contexts/UserContext';
import { State } from '../hooks/auth/State';
import { useAuth } from '../hooks/auth/useAuth';
import { firebase } from '../services/firebase/firebase';

type EnsureLoggedInContainerProps = {
    children: JSX.Element | JSX.Element[];
};

export function EnsureLoggedInContainer(
    props: EnsureLoggedInContainerProps,
): JSX.Element {
    const uiConfig: firebaseui.auth.Config = {
        callbacks: {
            signInSuccessWithAuthResult: () => false,
        },
        signInFlow: 'popup',
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    };
    const state: State = useAuth();

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
