import { MouseEvent, ReactNode } from 'react';
import { CgClose } from 'react-icons/cg';

import { Body } from './Body';
import { Footer } from './Footer';
import { Title } from './Title';

export type ModalProps = {
  children: ReactNode;
  onClose: () => void;
  show: boolean;
};

const Modal = ({ children, onClose, show }: ModalProps) => {
  const onClickStopPropagation = (event: MouseEvent) => {
    event.stopPropagation();
  };

  if (!show) {
    return null;
  }

  return (
    <>
      <div className="fixed z-50 inset-0 bg-black opacity-50"></div>
      <div
        className="fixed z-50 top-0 left-0 w-full h-full outline-none"
        onClick={onClose}
      >
        <div className="relative h-screen w-auto max-w-xl mx-auto py-4 pointer-events-none">
          <div
            className="border-none shadow-lg relative flex flex-col max-h-full w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current"
            onClick={onClickStopPropagation}
          >
            <button
              type="button"
              className="absolute top-4 right-4 text-gray-700 opacity-75 hover:opacity-100"
              aria-label="Remove text"
              onClick={onClose}
            >
              <CgClose size={24} />
            </button>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

Modal.Title = Title;
Modal.Body = Body;
Modal.Footer = Footer;

export { Modal };
