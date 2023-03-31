import {
  Button,
  Form,
  FormField,
  Input,
  Label,
} from '@recipes/ui/component/form';

import { useAuth } from '../auth/useAuth';

export type LoginFormData = {
  username: string;
  password: string;
};

export function Login() {
  const { login } = useAuth();

  const submitHandler = async (data: LoginFormData) => {
    await login(data.username, data.password);
  };

  return (
    <div className="max-w-screen-sm mx-auto mt-8 p-8 rounded bg-white shadow-md">
      <Form<LoginFormData> submitHandler={submitHandler}>
        <FormField
          label={<Label id="username">Username</Label>}
          input={<Input id="username" name="username" />}
        />
        <FormField
          label={<Label id="password">Password</Label>}
          input={<Input id="password" name="password" type="password" />}
        />
        <div className="flex justify-end py-2.5">
          <Button type="submit">Login</Button>
        </div>
      </Form>
    </div>
  );
}
