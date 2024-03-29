import { useMutation } from '@apollo/client';

import { Confirm } from '@recipes/ui/component/modal';

import { states } from '../crud/context/config';
import { useIsState } from '../crud/context/useIsState';
import { useStateContext } from '../crud/context/useStateContext';
import { Loading } from '../loading/Loading';

import { deleteProductMutation } from './gql/deleteProduct.mutation';

export function Remove(): JSX.Element {
  const show = useIsState(states.DELETE);
  const { cancel, success, selected } = useStateContext();
  const [deleteProduct, { loading }] = useMutation(deleteProductMutation, {
    onCompleted: success,
  });

  function removeProduct(): void {
    deleteProduct({ variables: { id: selected as string } });
  }

  return (
    <Confirm
      show={show}
      title="Delete product?"
      onCancel={cancel}
      onClose={cancel}
      onConfirm={removeProduct}
    >
      <p>This action cannot be undone.</p>
      {loading && <Loading />}
    </Confirm>
  );
}
