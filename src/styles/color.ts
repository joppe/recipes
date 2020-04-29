import { ColorConfig } from './ColorConfig';
import { ValidConfig } from './ValidConfig';

// tslint:disable-next-line typedef
const config = {
    red: {
        fireBrick: '#a5381f',
    },
    yellow: {
        robRoy: '#e1b664',
        tahunaSands: '#d1d9a9',
    },
    green: {
        smoke: '#9b9c55',
        cuttySark: '#578374',
    },
};

export const color: ValidConfig<typeof config, ColorConfig> = config;
