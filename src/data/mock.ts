import { MenuEntry } from '../services/recipes/Menu';
import { weekDays } from '../services/date/weekDays';

export function mock(today: Date): MenuEntry[] {
    const days: Date[] = weekDays(today);

    return [
        {
            date: days[0],
            recipe: {
                title: 'Nachos Todos',
            },
        },
        {
            date: days[1],
            recipe: {
                title: 'Tomaten groente soep',
            },
        },
        {
            date: days[2],
            recipe: {
                title: 'Nasi',
            },
        },
        {
            date: days[3],
            recipe: {
                title: 'Risotto',
            },
        },
        {
            date: days[4],
            recipe: {
                title: 'Bietensalade',
            },
        },
        {
            date: days[5],
            recipe: {
                title: 'Brocoli taart',
            },
        },
        {
            date: days[6],
            recipe: {
                title: 'Lasagne',
            },
        },
    ];
}
