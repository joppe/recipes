import { CgRuler } from 'react-icons/cg';

import { NewUnitForm } from './form/NewUnitForm';
import { createUnitMutation } from './gql/createUnit.mutation';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

import { CRUDTitle } from '../../components/crud/CRUDTitle';
import { CRUDNewForm } from '../../components/crud/form/CRUDNewForm';
import { CreateUnitMutation, Unit } from '../../gql/graphql';

export type UnitData = Omit<Unit, '__typename'>;

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
    <CRUDNewForm
      loading={loading}
      error={error}
      form={<NewUnitForm submitHandler={submitHandler} />}
    >
      <CRUDTitle icon={<CgRuler />}>New Unit</CRUDTitle>
    </CRUDNewForm>
  );
}
