import { useState } from 'react';

import { Button } from '../../form';
import { Modal } from '../Modal';
import { Confirm } from '../variants/Confirm';

export default {
  title: 'Component/Modal/Confirm',
  component: Modal,
};

function Template(): JSX.Element {
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <Button type="button" onClick={() => setShow(true)}>
        Show modal
      </Button>
      <Confirm
        title="Are you really shure?"
        show={show}
        onClose={() => {
          console.log('You are not sure?');
          setShow(false);
        }}
        onConfirm={() => {
          console.log('If you say so.');
          setShow(false);
        }}
        onCancel={() => {
          console.log('Okay understood, will not do it.');
          setShow(false);
        }}
      >
        <p>This action cannot be undone</p>
      </Confirm>
    </>
  );
}

export const Default = Template.bind({});
