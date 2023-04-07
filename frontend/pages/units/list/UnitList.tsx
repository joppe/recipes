import { useRef, useState } from 'react';
import { CgPen, CgTrash } from 'react-icons/cg';

import { useMutation } from '@apollo/client';

import { Button, Link } from '@recipes/ui/component/form';
import { Confirm } from '@recipes/ui/component/modal';

import { Loading } from '../../../components/loading/Loading';
import { Table } from '../../../components/table/Table';
import { DeleteUnitMutation, Unit } from '../../../gql/graphql';
import { deleteUnitMutation } from '../gql/deleteUnit.mutation';

export type UnitListProps = {
  units: Unit[];
  refetch: () => void;
};

export function UnitList({ units, refetch }: UnitListProps) {
  const [deleteUnit, { loading }] = useMutation(deleteUnitMutation, {
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
      <Table
        head={
          <>
            <Table.Header>Name</Table.Header>
            <Table.Header>Abbreviation</Table.Header>
            <Table.Header>Actions</Table.Header>
          </>
        }
      >
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
      </Table>
      <Confirm
        show={showConfirm}
        title="Delete unit?"
        onCancel={cancelRemove}
        onClose={cancelRemove}
        onConfirm={removeUnit}
      >
        <p>This action can't be undone.</p>
        {loading && <Loading />}
      </Confirm>
    </>
  );
}
