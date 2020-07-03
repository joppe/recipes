import * as React from 'react';

export const UserContext = React.createContext<firebase.User | null>(null);
