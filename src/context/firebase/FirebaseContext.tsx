import * as React from 'react';

import { firebase } from '../../service/firebase/firebase';

export const FirebaseContext = React.createContext<typeof firebase>(firebase);
