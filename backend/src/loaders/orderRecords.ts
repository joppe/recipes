type DatabasRecord = {
  id: string;
};

export function orderRecords<T extends DatabasRecord>(
  ids: string[],
  records: T[],
): T[] {
  const map: Record<string, T> = {};

  records.forEach((record) => {
    map[record.id] = record;
  });

  return ids.map((id) => map[id]);
}
