import {
  FormEvent,
  ReactNode,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { getValue } from './getValue';
import {
  FieldElement,
  FieldRegistry,
  FormContextValue,
  FormData,
  FormErrors,
  RegisterField,
  RegisteredField,
  SubmitHandler,
} from './types';
import { validate } from './validate';
import { validateFields } from './validateFields';

import { Validator } from '../validators';

export const FormContext = createContext<FormContextValue<FormData> | null>(
  null,
);

export interface FormContextProviderProps {
  children: ReactNode;
}

export const FormContextProvider = <T extends FormData>({
  children,
}: FormContextProviderProps) => {
  const fields = useRef<FieldRegistry<T>>({});
  const [errors, setErrors] = useState<FormErrors<T>>({});
  const updateErrors = (fieldName: keyof T, error: string | null) => {
    const newErrors = { ...errors };

    if (error && errors[fieldName] === undefined) {
      newErrors[fieldName] = error;

      setErrors(newErrors);
    } else if (!error && errors[fieldName] !== undefined) {
      delete newErrors[fieldName];

      setErrors(newErrors);
    }
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
          const data: Partial<T> = {};

          Object.keys(fields.current).reduce(
            (
              acc: Partial<T>,
              fieldName: keyof FieldRegistry<T>,
            ): Partial<T> => {
              const field = fields.current[fieldName];

              if (field !== undefined && field.value !== null) {
                acc[fieldName] = field.value;
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
      console.log('name', name);
      const field: RegisteredField<T[FieldName]> = {
        ref: null,
        validators,
        value: null,
        error: null,
        unregister: () => {
          console.warn(
            `Field "${
              name as string
            }" could not be unregistered because reference was never set`,
          );
        },
      };
      fields.current[name] = field;

      const onBlurHandler = async (event: Event) => {
        const value = getValue(
          event.target as HTMLInputElement,
        ) as T[FieldName];
        const error = await validate(value, validators);

        field.value = value;

        updateErrors(name, error);
      };

      return async (ref: FieldElement | null) => {
        if (ref === null) {
          return;
        }

        field.value = getValue(ref) as T[FieldName];

        ref.addEventListener('blur', onBlurHandler);

        const oldUnregister = field.unregister;

        field.unregister = () => {
          oldUnregister();

          ref.removeEventListener('blur', onBlurHandler);
        };
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
