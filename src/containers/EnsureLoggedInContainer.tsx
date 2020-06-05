import * as React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { UserContext } from '../context/UserContext';
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
    const [user, setUser] = React.useState<firebase.User | null>(null);

    React.useEffect(() => {
        return firebase
            .auth()
            .onAuthStateChanged((result: firebase.User | null): void => {
                if (result !== null) {
                    setUser(result);
                }
            });
    });

    if (user === null) {
        return (
            <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
            />
        );
    }

    return (
        <UserContext.Provider value={user}>
            {props.children}
        </UserContext.Provider>
    );
}
