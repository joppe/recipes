import * as React from 'react';

import { UserContext } from '../context/UserContext';
import { firebase } from '../service/firebase/firebase';

export function useSession(): firebase.User | null {
    return React.useContext<firebase.User | null>(UserContext);
}
