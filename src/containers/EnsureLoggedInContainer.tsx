import * as React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { firebase } from '../services/firebase/firebase';

type EnsureLoggedInContainerProps = {
    children: React.ReactNode;
};

export function EnsureLoggedInContainer(
    props: EnsureLoggedInContainerProps,
): React.ReactNode {
    const uiConfig: firebaseui.auth.Config = {
        signInFlow: 'popup',
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    };
    const [user, setUser] = React.useState<firebase.User | null>(null);

    React.useEffect(() => {
        return firebase
            .auth()
            .onAuthStateChanged((user: firebase.User | null): void => {
                console.log(user);
            });
    });

    if (user !== null) {
        return props.children;
    }

    return (
        <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
        />
    );
}
