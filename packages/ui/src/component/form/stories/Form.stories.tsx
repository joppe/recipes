import { Button, Form, FormField, Input, Label } from '../Form';

export default {
  title: 'Component/Form',
  component: Form,
};

const Template = () => (
  <Form>
    <FormField
      label={<Label id="email">Email</Label>}
      input={<Input id="email" name="email" />}
    />
    <FormField
      label={<Label id="password">Password</Label>}
      input={<Input id="password" name="password" type="password" />}
    />
    <div className="flex justify-end py-2.5">
      <Button type="submit">Login</Button>
    </div>
  </Form>
);

export const Default = Template.bind({});
