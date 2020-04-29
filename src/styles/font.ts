import { FontConfig } from './FontConfig';
import { ValidConfig } from './ValidConfig';

// tslint:disable-next-line typedef
const config = {
    size: {
        1: 8,
        2: 10,
        3: 12,
        4: 16,
    },
    lineHeight: {
        1: 1,
    },
};

export const font: ValidConfig<typeof config, FontConfig> = config;
