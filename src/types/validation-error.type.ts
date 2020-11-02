export type ValidationError<T> = {
    [P in keyof T]?: string;
};
