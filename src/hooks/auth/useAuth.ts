import * as React from 'react';

import { firebase } from '../../services/firebase/firebase';
import { State } from './State';

export function useAuth(): State {
    const [state, setState] = React.useState<State>(
        (): State => {
            const user: firebase.User | null = firebase.auth().currentUser;

            return {
                initializing: user === null,
                user,
            };
        },
    );

    React.useEffect(() => {
        console.log('useEffect');
        return firebase
            .auth()
            .onAuthStateChanged((user: firebase.User | null): void => {
                setState({
                    user,
                    initializing: false,
                });
            });
    }, []);

    return state;
}
