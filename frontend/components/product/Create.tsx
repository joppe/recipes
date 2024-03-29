import { useMutation } from '@apollo/client';

import { Modal } from '@recipes/ui/component/modal';

import { states } from '../crud/context/config';
import { useIsState } from '../crud/context/useIsState';
import { useStateContext } from '../crud/context/useStateContext';
import { FormShell } from '../crud/form/FormShell';

import { Product } from './Product';
import { Container } from './form/Container';
import { createProductMutation } from './gql/createProduct.mutation';

export function Create(): JSX.Element {
  const show = useIsState(states.NEW);
  const { cancel, success } = useStateContext();
  const [createProduct, { loading, data }] = useMutation(
    createProductMutation,
    {
      onCompleted: success,
    },
  );
  const error = data?.createProduct?.errors?.[0]?.message;

  const submitHandler = async (data: any): Promise<void> => {
    console.log('data', data);
    await createProduct({
      variables: {
        input: {
          name: data.name,
          media: {
            url: data.media.url,
            type: data.media.type,
            title: data.media.title,
          },
        },
      },
    });
  };

  return (
    <Modal show={show} onClose={cancel}>
      <Modal.Title>
        <h2>New Product</h2>
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
