import { MONDAY } from './days';
import { startOfDay } from './startOfDay';

export function startOfWeek(currentDate: Date): Date {
    const date: Date = startOfDay(currentDate);

    while (date.getDay() !== MONDAY) {
        date.setDate(date.getDate() - 1);
    }

    return date;
}
