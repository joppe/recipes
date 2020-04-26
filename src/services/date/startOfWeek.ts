import { startOfDay } from './startOfDay';
import { MONDAY } from './days';

// tslint:disable-next-line export-name
export function startOfWeek(currentDate: Date = new Date()): Date {
    const date: Date = startOfDay(currentDate);

    while (date.getDay() !== MONDAY) {
        date.setDate(date.getDate() - 1);
    }

    return date;
}
