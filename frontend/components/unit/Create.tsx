import { useMutation } from '@apollo/client';

import { Modal } from '@recipes/ui/component/modal';

import { states } from '../crud/context/config';
import { useIsState } from '../crud/context/useIsState';
import { useStateContext } from '../crud/context/useStateContext';
import { FormShell } from '../crud/form/FormShell';

import { Unit } from './Unit';
import { Container } from './form/Container';
import { createUnitMutation } from './gql/createUnit.mutation';

export function Create(): JSX.Element {
  const show = useIsState(states.NEW);
  const { cancel, success } = useStateContext();
  const [createUnit, { loading, data }] = useMutation(createUnitMutation, {
    onCompleted: success,
  });
  const error = data?.createUnit?.errors?.[0]?.message;

  const submitHandler = async (data: Unit): Promise<void> => {
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
    <Modal show={show} onClose={cancel}>
      <Modal.Title>
        <h2>New Unit</h2>
      </Modal.Title>

      <Modal.Body>
        <FormShell
          loading={loading}
          error={error}
          form={<Container cancel={cancel} submitHandler={submitHandler} />}
        />
      </Modal.Body>
    </Modal>
  );
}
