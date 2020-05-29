import { clone } from './clone';
import { startOfWeek } from './startOfWeek';

export function weekDays(currentDate: Date): Date[] {
    const start: Date = startOfWeek(currentDate);

    return Array.from(
        { length: 7 },
        (v: undefined, i: number): Date => {
            const date: Date = clone(start);

            date.setDate(date.getDate() + i);

            return date;
        },
    );
}
