import * as React from 'react';

import { firebase } from '../../service/firebase/firebase';
import { FirebaseContext } from './FirebaseContext';

type FirebaseProviderProps = {
    children: React.ReactNode;
};

export function FirebaseProvider(props: FirebaseProviderProps): JSX.Element {
    return (
        <FirebaseContext.Provider value={firebase}>
            {props.children}
        </FirebaseContext.Provider>
    );
}
