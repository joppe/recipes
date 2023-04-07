import { CgAddR, CgRuler } from 'react-icons/cg';

import { unitsQuery } from './gql/units.query';
import { UnitList } from './list/UnitList';
import { useQuery } from '@apollo/client';

import { Link } from '@recipes/ui/component/form';

import { CRUDTitle } from '../../components/crud/CRUDTitle';
import { CRUDList } from '../../components/crud/list/CRUDList';
import { Unit } from '../../gql/graphql';

export default function () {
  const { data, loading, error, refetch } = useQuery(unitsQuery);

  return (
    <CRUDList<Unit>
      loading={loading}
      error={error}
      items={data?.units}
      view={(units) => <UnitList units={units} refetch={refetch} />}
    >
      <CRUDTitle icon={<CgRuler />}>Units</CRUDTitle>
      <Link href="/units/new" variant="link">
        New unit
        <CgAddR />
      </Link>
    </CRUDList>
  );
}
