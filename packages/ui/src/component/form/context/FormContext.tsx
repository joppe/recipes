import {
  FormEvent,
  ReactNode,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Validator } from '../validators/Validator';
import { FormContextValue, Register } from './FormContextValue';
import { getValue } from './getValue';
import { validateField } from './validateField';

export type FieldValue = string | number | boolean | undefined;

export type Field = {
  value: FieldValue;
  error: string | null;
  unregister: () => void;
  validators: Validator[];
};

export const FormContext = createContext<FormContextValue | null>(null);

export interface FormContextProviderProps {
  children: ReactNode;
}
export const FormContextProvider = ({ children }: FormContextProviderProps) => {
  const fields = useRef<Record<string, Field>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const contextValue = {
    errors,
    handleSubmit: (handler: (data: Record<string, FieldValue>) => void) => {
      return async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data: Record<string, FieldValue> = {};
        const err: Record<string, string> = {};

        for (const fieldName in fields.current) {
          const error = await validateField(
            fields.current[fieldName].value,
            fields.current[fieldName].validators,
          );

          if (error) {
            err[fieldName] = error;
          }

          data[fieldName] = fields.current[fieldName].value;
        }

        if (Object.keys(err).length === 0) {
          handler(data);
        } else {
          setErrors(err);
        }
      };
    },
    register: (name: string, validators: Validator[]): Register => {
      fields.current[name] = {
        validators,
        value: undefined,
        error: null,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        unregister: () => {},
      };

      return async (
        ref: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null,
      ) => {
        if (ref === null) {
          return;
        }

        const onBlurHandler = async (event: Event) => {
          const value = getValue(event.target as HTMLInputElement);
          const error = await validateField(value, validators);

          fields.current[name].value = value;

          if (error && errors[name] === undefined) {
            const newErrors = { ...errors };

            newErrors[name] = error;

            setErrors(newErrors);
          } else if (!error && errors[name] !== undefined) {
            const newErrors = { ...errors };

            delete newErrors[name];

            setErrors(newErrors);
          }
        };

        ref.addEventListener('blur', onBlurHandler);

        fields.current[name].value = getValue(ref);

        const oldUnregister = fields.current[name].unregister;

        fields.current[name].unregister = () => {
          oldUnregister();

          ref.removeEventListener('blur', onBlurHandler);
        };
      };
    },
  };

  useEffect(() => {
    return () => {
      for (const fieldName in fields.current) {
        fields.current[fieldName].unregister();
      }
    };
  }, []);

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
};
