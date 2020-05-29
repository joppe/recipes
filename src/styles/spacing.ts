import { SizeConfig } from './SizeConfig';
import { ValidConfig } from './ValidConfig';

const config = {
    0: 0,
    1: 4,
    2: 8,
    3: 16,
    4: 32,
};

export const spacing: ValidConfig<typeof config, SizeConfig> = config;
