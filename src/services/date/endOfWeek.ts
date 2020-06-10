import { SUNDAY } from './days';
import { startOfDay } from './startOfDay';

export function endOfWeek(currentDate: Date): Date {
    const date: Date = startOfDay(currentDate);

    while (date.getDay() !== SUNDAY) {
        date.setDate(date.getDate() + 1);
    }

    return date;
}
