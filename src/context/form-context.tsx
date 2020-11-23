import React from 'react';

import { UseForm, useForm } from '../hook/use-form';

export type FormContextValue = Pick<UseForm, 'registerField' | 'errors'>;

export const FormContext = React.createContext<FormContextValue | undefined>(
    undefined,
);
