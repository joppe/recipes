import * as fbns from 'firebase';
import * as React from 'react';

import { Dish } from '../services/recipes/Dish';
import { useFirebase } from './useFirebase';

type FirebaseDish = Omit<Dish, 'id' | 'date'> & {
    date: fbns.firestore.Timestamp;
};

export function useDishes(fromDate: Date, toDate: Date): Dish[] {
    const firebase = useFirebase();
    const [dishes, setDishes] = React.useState<Dish[]>([]);

    React.useEffect((): void | (() => void) => {
        if (firebase === null) {
            return;
        }

        return firebase
            .firestore()
            .collection('dishes')
            .where('date', '>=', fromDate)
            .where('date', '<=', toDate)
            .orderBy('date', 'asc')
            .onSnapshot((collection: fbns.firestore.QuerySnapshot): void => {
                const newDishes: Dish[] = [];

                collection.forEach(
                    (document: fbns.firestore.DocumentData): void => {
                        const data: FirebaseDish = document.data();

                        newDishes.push({
                            ...data,
                            date: data.date.toDate(),
                            id: document.id,
                        });
                    },
                ),
                    setDishes(newDishes);
            });
    }, [fromDate, toDate]);

    return dishes;
}
