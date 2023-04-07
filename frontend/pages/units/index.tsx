import { useRef, useState } from 'react';
import { CgAddR, CgPen, CgRuler, CgTrash } from 'react-icons/cg';

import { deleteUnitMutation } from './deleteUnit.mutation';
import { unitsQuery } from './units.query';
import { useMutation, useQuery } from '@apollo/client';

import { Button, Link } from '@recipes/ui/component/form';
import { Confirm } from '@recipes/ui/component/modal';

import { Loading } from '../../components/loading/Loading';
import { DeleteUnitMutation, Unit } from '../../gql/graphql';

export type UnitListProps = {
  units: Unit[];
  refetch: () => void;
};

export function UnitList({ units, refetch }: UnitListProps) {
  const [deleteUnit, { loading, data }] = useMutation(deleteUnitMutation, {
    onCompleted: (data: DeleteUnitMutation) => {
      setShowConfirm(false);

      if (data.deleteUnit?.unit?.name) {
        refetch();
      }
    },
  });
  const [showConfirm, setShowConfirm] = useState(false);
  const selectedUnit = useRef<string | null>(null);

  const removeUnit = async () => {
    if (selectedUnit.current === null) {
      setShowConfirm(false);
      return;
    }
    await deleteUnit({ variables: { id: selectedUnit.current } });
  };

  const cancelRemove = () => {
    selectedUnit.current = null;
    setShowConfirm(false);
  };

  const handleRemoveClick = (id: string) => {
    selectedUnit.current = id;
    setShowConfirm(true);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th scope="col" className="px-6 py-4">
              Name
            </th>
            <th scope="col" className="px-6 py-4">
              Abbreviation
            </th>
            <th scope="col" className="px-6 py-4">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {units.map((unit) => {
            return (
              <tr key={unit.id} className="border-b">
                <td className="px-6 py-4">{unit.name}</td>
                <td className="px-6 py-4">{unit.abbreviation}</td>
                <td className="flex gap-2 px-6 py-4">
                  <Link href={`/ingredients/${unit.id}`} icon>
                    <CgPen />
                  </Link>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => handleRemoveClick(unit.id)}
                    icon
                  >
                    <CgTrash />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Confirm
        show={showConfirm}
        title="Delete unit?"
        onCancel={cancelRemove}
        onClose={cancelRemove}
        onConfirm={removeUnit}
      >
        <p>This action can't be undone.</p>
      </Confirm>
    </>
  );
}

export default function () {
  const { data, loading, error, refetch } = useQuery(unitsQuery);

  return (
    <>
      <header className="px-6">
        <h1 className="flex gap-2 items-center mb-5 mt-0 text-3xl font-semibold leading-normal">
          Units
          <CgRuler />
        </h1>
        <Link href="/units/new" variant="link">
          New unit
          <CgAddR />
        </Link>
      </header>
      {loading && <Loading />}
      {error && <p className="text-red-600">An error occured</p>}
      {data?.units.length && <UnitList units={data.units} refetch={refetch} />}
    </>
  );
}
