import React from 'react';

import { UseForm } from '../hook/use-form';

export type FormContextValue = Pick<UseForm, 'registerField' | 'errors'>;

export const FormContext = React.createContext<FormContextValue | undefined>(
    undefined,
);
