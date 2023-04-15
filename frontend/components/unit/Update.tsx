import { useMutation, useQuery } from '@apollo/client';

import { Modal } from '@recipes/ui/component/modal';

import { states } from '../crud/context/config';
import { useIsState } from '../crud/context/useIsState';
import { useStateContext } from '../crud/context/useStateContext';
import { FormShell } from '../crud/form/FormShell';

import { Unit } from './Unit';
import { Container } from './form/Container';
import { unitQuery } from './gql/unit.query';
import { updateUnitMutation } from './gql/updateUnit.mutation';

export function Update(): JSX.Element {
  const show = useIsState(states.EDIT);
  const { selected, cancel, success } = useStateContext();
  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = useQuery(unitQuery, {
    variables: { id: selected as string },
    skip: !show,
  });
  const [updateUnit, { loading: mutationLoading, data: mutationData }] =
    useMutation(updateUnitMutation, {
      onCompleted: success,
    });
  const error =
    mutationData?.updateUnit?.errors?.[0]?.message ||
    (queryError ? 'An error occurred' : '');
  const loading = queryLoading || mutationLoading;

  const submitHandler = async (data: Unit): Promise<void> => {
    await updateUnit({
      variables: {
        id: selected as string,
        input: {
          name: data.name,
          abbreviation: data.abbreviation,
        },
      },
    });
  };

  return (
    <Modal show={show} onClose={cancel}>
      <Modal.Title>
        <h2>Edit Unit</h2>
      </Modal.Title>

      <Modal.Body>
        <FormShell
          loading={loading}
          error={error}
          form={
            <Container
              cancel={cancel}
              submitHandler={submitHandler}
              unit={queryData?.unit as Unit}
            />
          }
        />
      </Modal.Body>
    </Modal>
  );
}
