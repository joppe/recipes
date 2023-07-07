import { useState } from 'react';

import {
  Button,
  Error,
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

/**
 * Handle error
 * await login returns a boolean indicating if the login was successfull
 */

export function Login() {
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const submitHandler = async (data: LoginFormData) => {
    const isLoggedIn = await login(data.username, data.password);

    if (!isLoggedIn) {
      setError('Invalid credentials');
    }
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
        {error && <Error>{error}</Error>}
        <div className="flex justify-end py-2.5">
          <Button type="submit">Login</Button>
        </div>
      </Form>
    </div>
  );
}
