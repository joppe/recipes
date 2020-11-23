import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core';
import React, { useState } from 'react';

import { RegisterReference } from '../../../hook/use-form';

type Props = {
    label: string;
    name: string;
    value?: boolean;
    className: string;
    defaultValue: boolean;
    registerField(): RegisterReference;
};

export function InputCheckbox(props: Props): JSX.Element {
    const [value, setValue] = useState(
        props.value === undefined ? props.defaultValue : props.value,
    );

    return (
        <FormGroup className={props.className}>
            <input
                type="hidden"
                name={props.name}
                value={`${value}`}
                ref={props.registerField()}
            />

            <FormControlLabel
                control={
                    <Checkbox
                        checked={value}
                        onChange={(event): void =>
                            setValue(event.target.checked)
                        }
                    />
                }
                label={props.label}
            />
        </FormGroup>
    );
}
