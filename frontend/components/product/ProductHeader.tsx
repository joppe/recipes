import { CgAddR, CgRuler } from 'react-icons/cg';

import { Button } from '@recipes/ui/component/form';

import { Header } from '../crud/Header';
import { Title } from '../crud/Title';
import { useStateContext } from '../crud/context/useStateContext';

export function ProductHeader(): JSX.Element {
  const { create } = useStateContext();

  return (
    <Header>
      <Title icon={<CgRuler />}>Products</Title>
      <div className="flex justify-end">
        <Button onClick={create} type="button" variant="link">
          New product <CgAddR />
        </Button>
      </div>
    </Header>
  );
}
