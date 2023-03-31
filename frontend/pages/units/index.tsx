import { unitsQuery } from './ingredients.query';
import { useQuery } from '@apollo/client';

import { Loading } from '../../components/loading/Loading';

export default function () {
  const { data, loading, error } = useQuery(unitsQuery);

  return (
    <>
      <h1>Units</h1>
      <a href="">New unit</a>
      {loading && <Loading />}
      {error && <p className="text-red-600">An error occured</p>}
      {data?.units.length && (
        <ul>
          {data.units.map((unit) => {
            return (
              <li key={unit.name}>
                <a href={`/ingredients/${unit.id}`}>{unit.name}</a> |{' '}
                {unit.abbreviation} <button type="button">x</button>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
