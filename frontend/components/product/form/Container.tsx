import { Button, Form } from '@recipes/ui/component/form';

import { Product } from '../Product';

import { Fields } from './Fields';

export type ContainerProps = {
  cancel: () => void;
  submitHandler: (data: Product) => void;
  product?: Product;
};

export function Container({
  cancel,
  submitHandler,
  product,
}: ContainerProps): JSX.Element {
  return (
    <Form<Product> submitHandler={submitHandler}>
      <Fields product={product} />
      <div className="flex gap-4 pt-4">
        <Button variant="secondary" type="button" onClick={cancel}>
          cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </Form>
  );
}
