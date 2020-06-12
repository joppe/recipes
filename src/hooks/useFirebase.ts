import * as fbns from 'firebase';
import * as React from 'react';

import { FirebaseContext } from '../contexts/firebase/FirebaseContext';

export function useFirebase(): typeof fbns | null {
    return React.useContext<typeof fbns | null>(FirebaseContext);
}
