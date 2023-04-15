import { Button, Form } from '@recipes/ui/component/form';

import { Unit } from '../Unit';

import { Fields } from './Fields';

export type ContainerProps = {
  cancel: () => void;
  submitHandler: (data: Unit) => void;
  unit?: Unit;
};

export function Container({
  cancel,
  submitHandler,
  unit,
}: ContainerProps): JSX.Element {
  return (
    <Form<Unit> submitHandler={submitHandler}>
      <Fields unit={unit} />
      <div className="flex gap-4 pt-4">
        <Button variant="secondary" type="button" onClick={cancel}>
          cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </Form>
  );
}
