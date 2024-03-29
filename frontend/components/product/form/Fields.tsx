import {
  Fieldset,
  FormField,
  Input,
  Label,
  Legend,
  Textarea,
  required,
  useForm,
} from '@recipes/ui/component/form';

import { LinkedMedia } from '../../media/LinkedMedia';
import { Product } from '../Product';

export type FieldsProps = {
  product?: Product;
};

export function Fields({ product }: FieldsProps): JSX.Element {
  const { errors } = useForm();

  return (
    <>
      <Fieldset>
        <Legend>Common</Legend>
        <FormField
          label={<Label id="name">Name</Label>}
          input={
            <Input
              id="name"
              name="name"
              type="text"
              validators={[required('Name is required')]}
              value={product?.name}
            />
          }
          error={
            errors['name'] !== undefined ? (
              <p className="my-2 text-red-600 text-sm">{errors['name']}</p>
            ) : null
          }
        />
        <FormField
          label={<Label id="description">Description</Label>}
          input={
            <Textarea
              id="description"
              name="description"
              value={product?.description ?? ''}
            />
          }
        />
      </Fieldset>
      <LinkedMedia />
    </>
  );
}
