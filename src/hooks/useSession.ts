import * as React from 'react';

import { UserContext } from '../contexts/UserContext';

export function useSession(): firebase.User {
    const user: firebase.User = React.useContext(UserContext) as firebase.User;

    return user;
}
