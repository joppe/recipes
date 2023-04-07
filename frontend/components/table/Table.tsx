import { ReactNode } from 'react';

type TableHeaderProps = { children: ReactNode };

function TableHeader({ children }: TableHeaderProps) {
  return (
    <th scope="col" className="px-6 py-4">
      {children}
    </th>
  );
}

type TableRowProps = {
  children: ReactNode;
  divider?: boolean;
};

function TableRow({ children, divider = false }: TableRowProps) {
  return <tr className={divider ? 'border-b' : ''}>{children}</tr>;
}

type TableCellProps = {
  children: ReactNode;
};

function TableCell({ children }: TableCellProps) {
  return <td className="flex gap-2 px-6 py-4">{children}</td>;
}

type TableProps = {
  head: ReactNode;
  children: ReactNode;
};

function Table({ head, children }: TableProps) {
  return (
    <table>
      <thead>
        <tr>{head}</tr>
      </thead>

      <tbody>{children}</tbody>
    </table>
  );
}

Table.Header = TableHeader;
Table.Cell = TableCell;
Table.Row = TableRow;

export { Table };
