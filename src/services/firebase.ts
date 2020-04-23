import firebase from 'firebase';
import 'firebase/firestore';

const config = {
    apiKey: 'AIzaSyA7a3mcunAZ4TBa9nGsAKx9rkh8cJFvH9k',
    authDomain: 'cooking-f5edd.firebaseapp.com',
    databaseURL: 'https://cooking-f5edd.firebaseio.com',
    projectId: 'cooking-f5edd',
    storageBucket: 'cooking-f5edd.appspot.com',
    messagingSenderId: '352227529421',
    appId: '1:352227529421:web:9d0953775ef9aa83',
};

class Firebase {
    constructor() {
        firebase.initializeApp(config);
        this.store = firebase.firestore;
        this.auth = firebase.auth;
    }

    get polls() {
        return this.store().collection('polls');
    }
}

export default new Firebase();
