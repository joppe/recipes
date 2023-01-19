import { Form } from '../Form';
import { useForm } from '../context/useForm';
import {
  Button,
  Checkbox,
  FormField,
  Input,
  Label,
  Notification,
  Radio,
  RadioGroup,
  Select,
  Textarea,
} from '../elements';
import { minLength, required } from '../validators';

export default {
  title: 'Component/Form',
  component: Form,
};

const Template = () => {
  const Inner = () => {
    const { errors } = useForm();

    return (
      <>
        <FormField
          label={<Label id="theme">Theme</Label>}
          input={
            <Select
              id="theme"
              name="theme"
              options={[
                { id: 'dark', text: 'Dark theme' },
                { id: 'light', text: 'Light theme' },
              ]}
            />
          }
        />
        <FormField
          label={<Label id="email">Email</Label>}
          input={
            <Input
              id="email"
              name="email"
              validators={[minLength(4, 'Email is too short')]}
            />
          }
          error={
            errors['email'] !== undefined ? (
              <p className="my-2 text-red-600 text-sm">{errors['email']}</p>
            ) : null
          }
        />
        <FormField
          label={<Label id="password">Password</Label>}
          input={
            <Input
              id="password"
              name="password"
              type="password"
              validators={[required('Password is required')]}
            />
          }
          error={
            errors['password'] !== undefined ? (
              <p className="my-2 text-red-600 text-sm">{errors['password']}</p>
            ) : null
          }
        />
        <FormField
          label={<Label id="comment">Comment</Label>}
          input={<Textarea id="comment" name="comment" />}
        />
        <FormField
          type="col"
          label={<Label id="save_session">Save session</Label>}
          input={<Checkbox id="save_session" name="save_session" checked />}
          reverse
        />
        <RadioGroup title="Gender">
          <FormField
            type="col"
            label={<Label id="gender_male">Male</Label>}
            input={<Radio name="gender" id="gender_male" value="male" />}
            reverse
          />
          <FormField
            type="col"
            label={<Label id="gender_female">Female</Label>}
            input={<Radio name="gender" id="gender_female" value="female" />}
            reverse
          />
        </RadioGroup>
      </>
    );
  };

  return (
    <Form
      submitHandler={(data: FormData) => {
        console.log(data);
      }}
    >
      <Inner />
      <Notification />

      <div className="flex justify-end py-2.5">
        <Button type="submit">Login</Button>
      </div>
    </Form>
  );
};
export const Default = Template.bind({});
