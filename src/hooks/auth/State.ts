import * as firebase from 'firebase';

export type State = {
    initializing: boolean;
    user: firebase.User | null;
};
