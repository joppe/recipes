import { firebase } from '../../service/firebase/firebase';

export type State = {
    initializing: boolean;
    user: firebase.User | null;
};
