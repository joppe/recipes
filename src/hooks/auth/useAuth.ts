import * as fbns from 'firebase';
import * as React from 'react';

import { State } from './State';

export function useAuth(firebase: typeof fbns | null): State {
    const [state, setState] = React.useState<State>({
        initializing: true,
        user: null,
    });

    React.useEffect(() => {
        if (firebase === null) {
            return;
        }

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
