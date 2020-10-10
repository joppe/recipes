export type ValidationError<T> = {
    [P in keyof T]: boolean;
};
