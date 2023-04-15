import { useState } from 'react';

import { Modal } from '@recipes/ui/component/modal';

import { MenuItem } from './MenuItem';

const MENU_ITEMS = [
  { title: 'Products', url: '/products' },
  { title: 'Units', url: '/units' },
  { title: 'Chefs', url: '/chefs' },
];

export function Menu() {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  return (
    <>
      <button type="button" onClick={handleShow}>
        Menu
      </button>
      <Modal show={show} onClose={handleClose}>
        <Modal.Body>
          <nav>
            <ul>
              {MENU_ITEMS.map(({ url, title }) => {
                return (
                  <MenuItem key={title} url={url}>
                    {title}
                  </MenuItem>
                );
              })}
            </ul>
          </nav>
        </Modal.Body>
      </Modal>
    </>
  );
}
