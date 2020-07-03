import * as React from 'react';

import { useFirebase } from '../useFirebase';
import { State } from './State';

export function useAuth(): State {
    const firebase = useFirebase();
    const [state, setState] = React.useState<State>(() => {
        const user = firebase.auth().currentUser;

        return {
            user,
            initializing: user === null,
        };
    });

    React.useEffect(() => {
        return firebase
            .auth()
            .onAuthStateChanged((user: firebase.User | null): void => {
                setState({
                    user,
                    initializing: false,
                });
            });
    }, [firebase]);

    return state;
}
