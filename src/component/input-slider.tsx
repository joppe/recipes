import { FormGroup, Slider, Typography } from '@material-ui/core';
import { useState } from 'react';

import { RegisterReference } from '../hook/use-form';

type Props = {
    min: number;
    max: number;
    step: number;
    label: string;
    name: string;
    value?: number;
    className: string;
    defaultValue: number;
    registerField(): RegisterReference;
};

export function InputSlider(props: Props): JSX.Element {
    const [value, setValue] = useState(
        props.value === undefined ? props.defaultValue : props.value,
    );

    return (
        <FormGroup className={props.className}>
            <input
                type="hidden"
                name={props.name}
                value={value}
                ref={props.registerField()}
            />

            <Typography id="range-slider" gutterBottom>
                {props.label}
            </Typography>

            <Slider
                value={value}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={props.step}
                marks
                min={props.min}
                max={props.max}
                onChange={(event, newValue): void =>
                    setValue(newValue as number)
                }
            />
        </FormGroup>
    );
}
