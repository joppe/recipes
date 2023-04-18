import { useState } from 'react';

import { Button } from '../../form';
import { Modal } from '../Modal';

export default {
  title: 'Component/Modal',
  component: Modal,
};

function Template(): JSX.Element {
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <Button type="button" onClick={() => setShow(true)}>
        Show modal
      </Button>
      <Modal show={show} onClose={() => setShow(false)}>
        <Modal.Title>
          <h5 className="text-xl font-medium leading-normal text-gray-800">
            Modal title
          </h5>
        </Modal.Title>

        <Modal.Body>
          <p>
            This is some placeholder content to show the scrolling behavior for
            modals. We use repeated line breaks to demonstrate how content can
            exceed minimum inner height, thereby showing inner scrolling. When
            content becomes longer than the predefined max-height of modal,
            content will be cropped and scrollable within the modal.
          </p>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <p>This content should appear at the bottom after you scroll.</p>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            type="button"
            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
          >
            Save changes
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export const Default = Template.bind({});
