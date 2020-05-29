import 'firebase/auth';
import 'firebase/database';

import * as firebase from 'firebase/app';

import { config } from './config';

if (firebase.apps.length === 0) {
    firebase.initializeApp(config);
}

export { firebase };
