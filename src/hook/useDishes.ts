import * as React from 'react';

import { firebase } from '../service/firebase/firebase';
import { Dish } from '../service/recipes/Dish';
import { useFirebase } from './useFirebase';

type FirebaseDish = Omit<Dish, 'id' | 'date'> & {
    date: firebase.firestore.Timestamp;
};

export function useDishes(fromDate: Date, toDate: Date): Dish[] {
    const firebase = useFirebase();
    const [dishes, setDishes] = React.useState<Dish[]>([]);

    React.useEffect((): void | (() => void) => {
        return firebase
            .firestore()
            .collection('dishes')
            .where('date', '>=', fromDate)
            .where('date', '<=', toDate)
            .orderBy('date', 'asc')
            .onSnapshot(
                (collection: firebase.firestore.QuerySnapshot): void => {
                    const newDishes: Dish[] = [];

                    collection.forEach(
                        (document: firebase.firestore.DocumentData): void => {
                            const data: FirebaseDish = document.data();

                            newDishes.push({
                                ...data,
                                date: data.date.toDate(),
                                id: document.id,
                            });
                        },
                    );

                    setDishes(newDishes);
                },
            );
    }, [fromDate.getTime(), toDate.getTime()]);

    return dishes;
}
