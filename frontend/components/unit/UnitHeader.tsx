import { CgAddR, CgRuler } from 'react-icons/cg';

import { Button } from '@recipes/ui/component/form';

import { Header } from '../crud/Header';
import { Title } from '../crud/Title';
import { useStateContext } from '../crud/context/useStateContext';

export function UnitHeader(): JSX.Element {
  const { create } = useStateContext();

  return (
    <Header>
      <Title icon={<CgRuler />}>Units</Title>
      <div className="flex justify-end">
        <Button onClick={create} type="button" variant="link">
          New unit <CgAddR />
        </Button>
      </div>
    </Header>
  );
}
