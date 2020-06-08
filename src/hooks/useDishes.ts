import * as React from 'react';

import { firebase } from '../services/firebase/firebase';
import { Dish } from './dish/Dish';

export function useDishes() {
    const [dishes, setDishes] = React.useState<Dish[]>([]);

    React.useEffect((): (() => void) => {
        firebase.firestore().collection('recipes').doc();
    });
}
