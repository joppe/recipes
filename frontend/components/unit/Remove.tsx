import { deleteUnitMutation } from './gql/deleteUnit.mutation';
import { useMutation } from '@apollo/client';

import { Confirm } from '@recipes/ui/component/modal';

import { states } from '../crud/context/config';
import { useIsState } from '../crud/context/useIsState';
import { useStateContext } from '../crud/context/useStateContext';
import { Loading } from '../loading/Loading';

export function Remove(): JSX.Element {
  const show = useIsState(states.DELETE);
  const { cancel, success, selected } = useStateContext();
  const [deleteUnit, { loading }] = useMutation(deleteUnitMutation, {
    onCompleted: success,
  });

  function removeUnit(): void {
    deleteUnit({ variables: { id: selected as string } });
  }

  return (
    <Confirm
      show={show}
      title="Delete unit?"
      onCancel={cancel}
      onClose={cancel}
      onConfirm={removeUnit}
    >
      <p>This action cannot be undone.</p>
      {loading && <Loading />}
    </Confirm>
  );
}
