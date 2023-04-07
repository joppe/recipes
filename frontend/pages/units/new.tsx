import { createUnitMutation } from './createUnit.mutation';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

import {
  Button,
  Form,
  FormField,
  Input,
  Label,
  required,
} from '@recipes/ui/component/form';

import { Loading } from '../../components/loading/Loading';
import { CreateUnitMutation } from '../../gql/graphql';

type UnitData = {
  name: string;
  abbreviation: string;
};

export default function () {
  const router = useRouter();
  const [createUnit, { loading, data }] = useMutation(createUnitMutation, {
    onCompleted: (data: CreateUnitMutation) => {
      if (data.createUnit?.unit?.name) {
        router.push('/units');
      }
    },
  });
  const error = data?.createUnit?.errors?.[0]?.message;

  const submitHandler = async (data: UnitData): Promise<void> => {
    console.log(data);

    await createUnit({
      variables: {
        input: {
          name: data.name,
          abbreviation: data.abbreviation,
        },
      },
    });
  };

  return (
    <>
      <h1>New Unit</h1>
      {loading && <Loading />}
      {error && <p className="text-red-600">{error}</p>}
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
          <Button type="submit" disabled={loading}>
            Save
          </Button>{' '}
          or <a href="/units">cancel</a>
        </fieldset>
      </Form>
    </>
  );
}
