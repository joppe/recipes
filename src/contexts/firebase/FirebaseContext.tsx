import * as fbns from 'firebase';
import * as React from 'react';

export const FirebaseContext = React.createContext<typeof fbns | null>(null);
