import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { FormEvent } from 'react';
import { useRef } from 'react';
import { createContext } from 'react';
import { ReactNode } from 'react';

// flex flex-col w-full max-w-2xl p-8 rounded-lg radius-m bg-white shadow-lg

export type Validator = (value: string) => Promise<string | null>;

export const minLength =
  (length: number, message: string) =>
  (value: string): Promise<string | null> =>
    Promise.resolve(value.length < length ? message : null);

export const maxLength =
  (length: number, message: string) =>
  (value: string): Promise<string | null> =>
    Promise.resolve(value.length > length ? message : null);

export const required =
  (message: string) =>
  (value: string): Promise<string | null> =>
    Promise.resolve(value.length === 0 ? message : null);

export type Field = {
  ref: null | HTMLInputElement;
  value: string;
  error: string | null;
  unregister: () => void;
  validators: Validator[];
};

export type Register = (ref: HTMLInputElement) => void;

export type FormContextValue = {
  errors: Record<string, string>;
  handleSubmit: (
    handler: (data: Record<string, string | number>) => void,
  ) => (event: FormEvent<HTMLFormElement>) => void;
  register: (name: string, validators: Validator[]) => Register;
};

export const FormContext = createContext<FormContextValue | null>(null);

export const useForm = (): FormContextValue => {
  const context = useContext(FormContext);

  if (context === null) {
    throw new Error('Unable to find context provider for AutocompleteContext');
  }

  return context;
};

export const validateField = async (
  value: string,
  validators: Validator[],
): Promise<string | null> => {
  let error = null;

  for (const validator of validators) {
    error = await validator(value);

    if (error !== null) {
      break;
    }
  }

  return error;
};

export interface FormContextProviderProps {
  //   form: MutableRefObject<HTMLFormElement | null>;
  children: ReactNode;
}
export const FormContextProvider = ({ children }: FormContextProviderProps) => {
  const fields = useRef<Record<string, Field>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const contextValue = {
    errors,
    handleSubmit: (
      handler: (data: Record<string, string | number>) => void,
    ) => {
      return (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data: Record<string, string> = {};

        for (const fieldName in fields.current) {
          data[fieldName] = fields.current[fieldName].value;
        }

        if (Object.keys(errors).length === 0) {
          handler(data);
        } else {
          console.log('fix errors before submitting');
        }
      };
    },
    register: (name: string, validators: Validator[]): Register => {
      fields.current[name] = {
        ref: null,
        validators,
        value: '',
        error: null,
        unregister: () => {
          //
        },
      };

      return async (ref: HTMLInputElement | null) => {
        if (ref === null) {
          return;
        }

        const onChangeHandler = (event: Event) => {
          const { value } = event.target as HTMLInputElement;

          fields.current[name].value = value;
        };

        const onBlurHandler = async (event: Event) => {
          const { value } = event.target as HTMLInputElement;
          const error = await validateField(value, validators);

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

        ref.addEventListener('change', onChangeHandler);
        ref.addEventListener('blur', onBlurHandler);

        fields.current[name].value = ref.value;
        fields.current[name].ref = ref;
        fields.current[name].unregister = () => {
          ref.removeEventListener('change', onChangeHandler);
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

export interface InputProps<T> {
  name: string;
  id: string;
  type?: string;
  value?: T;
}
export const Input = ({
  name,
  id,
  value = '',
  type = 'text',
}: InputProps<string>) => {
  const { register } = useForm();
  const ref = register(name, [minLength(2, 'input too short')]);

  return (
    <input
      ref={ref}
      type={type}
      name={name}
      id={id}
      defaultValue={value}
      className="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded m-0 focus:text-gray-700 focus:bg-white focus:border-indigo-600 focus:outline-none"
    />
  );
};

export interface ButtonProps {
  type?: 'button' | 'reset' | 'submit';
  children: ReactNode;
}
export const Button = ({ type = 'button', children }: ButtonProps) => {
  return (
    <button
      type={type}
      className="px-6 py-2.5 bg-indigo-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out"
    >
      {children}
    </button>
  );
};

export interface LabelProps {
  id: string;
  children: ReactNode;
}
export const Label = ({ children, id }: LabelProps) => {
  return (
    <label htmlFor={id} className="inline-block mb-2 text-gray-700">
      {children}
    </label>
  );
};

export interface FormFieldProps {
  label: ReactNode;
  input: ReactNode;
}
export const FormField = ({ label, input }: FormFieldProps) => {
  return (
    <div className="flex flex-col">
      <div>{label}</div>
      <div>{input}</div>
    </div>
  );
};

export interface FormElementProps {
  children: ReactNode;
}
export const FormElement = ({ children }: FormElementProps) => {
  const { handleSubmit, errors } = useForm();

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={handleSubmit((data: Record<string, string | number>) => {
        console.log('>>', data);
      })}
    >
      {children}
      {Object.keys(errors).length > 0 && (
        <div>
          {Object.keys(errors).map((field) => (
            <div key={field}>{errors[field]}</div>
          ))}
        </div>
      )}
    </form>
  );
};

export interface FormProps {
  children: ReactNode;
}
export const Form = ({ children }: FormProps) => {
  return (
    <FormContextProvider>
      <FormElement>{children}</FormElement>
    </FormContextProvider>
  );
};
