export function fromTimestamp(timestamp: number): Date {
    const date = new Date();

    date.setTime(timestamp);

    return date;
}
