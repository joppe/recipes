import firebase from 'firebase';
// tslint:disable-next-line no-import-side-effect
import 'firebase/firestore';

import { config } from './config';

firebase.initializeApp(config);

// tslint:disable-next-line export-name
export const db: firebase.database.Database = firebase.database();
