import { MenuEntry } from '../../services/recipes/Menu';

export type Action = {
    type: 'update';
    payload: MenuEntry;
};

export function reducer(state: MenuEntry[], action: Action): MenuEntry[] {
    switch (action.type) {
        case 'update':
            return state.map(
                (entry: MenuEntry): MenuEntry => {
                    if (action.payload.date === entry.date) {
                        return {
                            date: entry.date,
                            recipe: {
                                ...entry.recipe,
                                ...action.payload.recipe,
                            },
                        };
                    }

                    return entry;
                },
            );
        default:
            throw new Error();
    }
}
