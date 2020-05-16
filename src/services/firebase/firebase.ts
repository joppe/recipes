import * as firebase from 'firebase/app';
// tslint:disable-next-line no-import-side-effect
import 'firebase/auth';
// tslint:disable-next-line no-import-side-effect
import 'firebase/database';

import { config } from './config';

if (firebase.apps.length === 0) {
    firebase.initializeApp(config);
}

export { firebase };
