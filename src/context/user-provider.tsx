import cookie from 'cookie';
import React, { useState } from 'react';

import { Anonymous, UserInfo } from '../types/user.type';

const anonymous: Anonymous = {
    role: 'anonymous',
};

type UserContextValue = {
    user: UserInfo;
    setUser: (user: UserInfo) => void;
};

export const UserContext = React.createContext<UserContextValue>({
    user: {
        role: 'anonymous',
    },
    setUser: (user: UserInfo): void => {
        // set the user in a state
    },
});

type Props = {
    children: React.ReactNode;
};

export function UserProvider(props: Props): JSX.Element {
    const [user, setUser] = useState<UserInfo>(() => {
        // cookie.parse()
        return anonymous;
    });
    const value = {
        user,
        setUser: (user: UserInfo): void => {
            console.log(user);
            setUser(user);
        },
    };

    console.log(user);

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    );
}
