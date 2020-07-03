import * as React from 'react';

import { FirebaseContext } from '../context/firebase/FirebaseContext';
import { firebase } from '../service/firebase/firebase';

export function useFirebase(): typeof firebase {
    return React.useContext<typeof firebase>(FirebaseContext);
}
