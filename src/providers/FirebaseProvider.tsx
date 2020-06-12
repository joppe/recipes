import * as fbns from 'firebase';
import * as React from 'react';

import { FirebaseContext } from '../contexts/firebase/FirebaseContext';
import { config } from './config';

type FirebaseProviderProps = {
    children: React.ReactNode;
};

export function FirebaseProvider(props: FirebaseProviderProps): JSX.Element {
    const [firebase, setFirebase] = React.useState<typeof fbns | null>(null);

    React.useEffect((): void => {
        if (firebase !== null) {
            return;
        }

        Promise.all([
            import('firebase/app'),
            import('firebase/auth'),
            import('firebase/firestore'),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ]).then((imports: any[]): void => {
            const firebase = imports[0];

            firebase.initializeApp(config);
            setFirebase(firebase as typeof fbns);
        });
    }, []);

    return (
        <FirebaseContext.Provider value={firebase}>
            {props.children}
        </FirebaseContext.Provider>
    );
}
