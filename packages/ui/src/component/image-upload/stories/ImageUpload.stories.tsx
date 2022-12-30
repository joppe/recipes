import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { Button, Form, FormField, Label, Notification } from '../../form';
import { ImageUpload } from '../ImageUpload';

export default {
  title: 'Component/ImageUpload',
  component: ImageUpload,
};

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyYjExNmM2Ni1hY2QyLTQ3MDEtYjgxMC1jZjkxZDgwODkxODUiLCJpYXQiOjE2NzIzMjQ0MzIsImV4cCI6MTY3NTkyNDQzMn0.e9aV-GcxVRcSEczouFweCMSE9K9PDZ1f5Wd-I35vEec';

  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const Template = () => {
  return (
    <ApolloProvider client={client}>
      <Form>
        <FormField
          label={<Label id="image">Image</Label>}
          input={
            <ImageUpload
              name="image"
              id="image"
              value="https://placekitten.com/400/400"
            />
          }
        />

        <Notification />

        <div className="flex justify-end py-2.5">
          <Button type="submit">Save</Button>
        </div>
      </Form>
    </ApolloProvider>
  );
};

export const Default = Template.bind({});
