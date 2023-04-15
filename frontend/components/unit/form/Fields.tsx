import {
  FormField,
  Input,
  Label,
  required,
  useForm,
} from '@recipes/ui/component/form';

import { Unit } from '../Unit';

export type FieldsProps = {
  unit?: Unit;
};

export function Fields({ unit }: FieldsProps): JSX.Element {
  const { errors } = useForm();

  return (
    <>
      <FormField
        label={<Label id="name">Name</Label>}
        input={
          <Input
            id="name"
            name="name"
            type="text"
            validators={[required('Name is required')]}
            value={unit?.name}
          />
        }
        error={
          errors['name'] !== undefined ? (
            <p className="my-2 text-red-600 text-sm">{errors['name']}</p>
          ) : null
        }
      />
      <FormField
        label={<Label id="abbreviation">Abbreviation</Label>}
        input={
          <Input
            id="abbreviation"
            name="abbreviation"
            type="text"
            validators={[required('Abbreviation is required')]}
            value={unit?.abbreviation}
          />
        }
        error={
          errors['abbreviation'] !== undefined ? (
            <p className="my-2 text-red-600 text-sm">
              {errors['abbreviation']}
            </p>
          ) : null
        }
      />
    </>
  );
}
