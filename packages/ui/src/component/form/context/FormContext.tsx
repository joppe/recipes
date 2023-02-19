import {
  FormEvent,
  ReactNode,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { getValue } from './getValue';
import { validate } from './validate';
import { validateFields } from './validateFields';

import { FieldElement } from '../types/FieldElement';
import { FieldRegistry } from '../types/FieldRegistry';
import { FormContextValue } from '../types/FormContextValue';
import { FormData } from '../types/FormData';
import { FormErrors } from '../types/FormErrors';
import { RegisterField } from '../types/RegisterField';
import { RegisteredField } from '../types/RegisteredField';
import { SubmitHandler } from '../types/SubmitHandler';
import { Validator } from '../validators';

export const FormContext = createContext<FormContextValue<FormData> | null>(
  null,
);

export interface FormContextProviderProps {
  children: ReactNode;
}

function allowMultipleElements(element: FieldElement, existing: FieldElement) {
  return element.type === 'radio' && existing.type === 'radio';
}

export const FormContextProvider = <T extends FormData>({
  children,
}: FormContextProviderProps) => {
  const fields = useRef<FieldRegistry<T>>({});
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const updateErrors = () => {
    const newErrors = Object.keys(fields.current).reduce(
      (
        err: FormErrors<T>,
        fieldName: keyof FieldRegistry<T>,
      ): FormErrors<T> => {
        const field = fields.current[fieldName];

        if (field !== undefined && field.error) {
          err[fieldName] = field.error;
        }

        return err;
      },
      {},
    );

    setErrors(newErrors);
  };
  const contextValue = {
    errors,
    handleSubmit: (handler: SubmitHandler<T>) => {
      return async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const error = await validateFields<T>(fields.current);

        if (Object.keys(error).length !== 0) {
          setErrors(error);
        } else {
          const data: Partial<T> = Object.keys(fields.current).reduce(
            (
              acc: Partial<T>,
              fieldName: keyof FieldRegistry<T>,
            ): Partial<T> => {
              const field = fields.current[fieldName];

              if (field !== undefined && field.value !== null) {
                acc[fieldName] = getValue(field.ref) as T[keyof T];
              }

              return acc;
            },
            {},
          );

          handler(data as T);
        }
      };
    },
    register: <FieldName extends keyof T>(
      name: FieldName,
      validators: Validator[],
    ): RegisterField => {
      const onBlurHandler = async (event: Event) => {
        const element = event.target as FieldElement;
        const field = fields.current[element.name] as RegisteredField<
          T[FieldName]
        >;
        const value = getValue(field.ref) as T[FieldName];
        const error = await validate(value, validators);
        const oldError = field.error;

        field.value = value;
        field.error = error;

        if (oldError !== error) {
          updateErrors();
        }
      };

      return async (element: FieldElement | null) => {
        if (element === null) {
          throw new Error('Element is null');
        }

        const existing = fields.current[name];

        if (
          existing !== undefined &&
          !allowMultipleElements(element, existing.ref[0])
        ) {
          throw new Error(
            `There is already an element registered with name "${String(
              name,
            )}"`,
          );
        }

        if (existing === undefined) {
          fields.current[name] = {
            ref: [element],
            validators,
            value: getValue([element]) as T[FieldName],
            error: null,
            unregister() {
              element.removeEventListener('blur', onBlurHandler);
            },
          };
        } else {
          existing.ref.push(element);
          existing.value = getValue(existing.ref) as T[FieldName];
        }

        element.addEventListener('blur', onBlurHandler);
      };
    },
    unregister: (name: string) => {
      const field = fields.current[name];

      if (field !== undefined) {
        field.unregister();
      }
    },
  };

  useEffect(() => {
    return () => {
      Object.values(fields.current).forEach((field) => field.unregister());
    };
  }, []);

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
};
