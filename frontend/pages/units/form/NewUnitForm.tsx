import {
  Button,
  Form,
  FormField,
  Input,
  Label,
  Link,
  required,
} from '@recipes/ui/component/form';

import { UnitData } from '../new';

type NewUnitFormProps = {
  submitHandler: (data: UnitData) => Promise<void>;
};
export function NewUnitForm({ submitHandler }: NewUnitFormProps) {
  return (
    <Form<UnitData> submitHandler={submitHandler}>
      <fieldset>
        <legend>Unit properties</legend>
        <FormField
          label={<Label id="name">Name</Label>}
          input={
            <Input
              id="name"
              name="name"
              type="text"
              validators={[required('Name is required')]}
            />
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
            />
          }
        />
        <div className="flex gap-4 pt-4">
          <Link variant="secondary" href="/units">
            cancel
          </Link>
          <Button type="submit">Save</Button>
        </div>
      </fieldset>
    </Form>
  );
}
