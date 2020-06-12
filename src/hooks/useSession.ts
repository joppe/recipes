import * as React from 'react';

import { UserContext } from '../contexts/UserContext';

export function useSession(): firebase.User | null {
    return React.useContext<firebase.User | null>(UserContext);
}
