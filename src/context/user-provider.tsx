import React, { useEffect, useState } from 'react';

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
    setUser: (): void => {
        // set the user in a state
    },
});

type Props = {
    children: React.ReactNode;
};

export function UserProvider(props: Props): JSX.Element {
    const [user, setUser] = useState<UserInfo>(anonymous);
    const value = {
        user,
        setUser: (user: UserInfo): void => {
            // store data in localstorage
            setUser(user);
        },
    };

    useEffect((): void => {
        async function whoAmI(): Promise<void> {
            const result = await fetch('/api/who-am-i');
            const json = await result.json();

            if (json.user !== null) {
                setUser(json.user);
            }
        }

        whoAmI();
    }, []);

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    );
}
