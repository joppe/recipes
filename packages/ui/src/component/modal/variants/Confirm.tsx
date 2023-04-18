import { ReactNode } from 'react';

import { Button } from '../../form';
import { Modal } from '../Modal';

export type ConfirmProps = {
  show: boolean;
  title: string;
  children: ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
};
export function Confirm({
  show,
  title,
  children,
  onConfirm,
  onCancel,
  onClose,
}: ConfirmProps): JSX.Element {
  return (
    <Modal show={show} onClose={onClose}>
      <Modal.Title>
        <h5 className="text-xl font-medium leading-normal text-gray-800">
          {title}
        </h5>
      </Modal.Title>

      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" type="button" onClick={onConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
