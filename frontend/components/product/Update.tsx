import { useMutation, useQuery } from '@apollo/client';

import { Modal } from '@recipes/ui/component/modal';

import { states } from '../crud/context/config';
import { useIsState } from '../crud/context/useIsState';
import { useStateContext } from '../crud/context/useStateContext';
import { FormShell } from '../crud/form/FormShell';

import { Product } from './Product';
import { Container } from './form/Container';
import { productQuery } from './gql/product.query';
import { updateProductMutation } from './gql/updateProduct.mutation';

export function Update(): JSX.Element {
  const show = useIsState(states.EDIT);
  const { selected, cancel, success } = useStateContext();
  const {
    data: queryData,
    loading: queryLoading,
    error: queryError,
  } = useQuery(productQuery, {
    variables: { id: selected as string },
    skip: !show,
  });
  const [updateProduct, { loading: mutationLoading, data: mutationData }] =
    useMutation(updateProductMutation, {
      onCompleted: success,
    });
  const error =
    mutationData?.updateProduct?.errors?.[0]?.message ||
    (queryError ? 'An error occurred' : '');
  const loading = queryLoading || mutationLoading;

  const submitHandler = async (data: Product): Promise<void> => {
    await updateProduct({
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
        <h2>Edit Product</h2>
      </Modal.Title>

      <Modal.Body>
        <FormShell
          loading={loading}
          error={error}
          form={
            <Container
              cancel={cancel}
              submitHandler={submitHandler}
              product={queryData?.product as Product}
            />
          }
        />
      </Modal.Body>
    </Modal>
  );
}
