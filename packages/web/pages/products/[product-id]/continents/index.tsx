import { NextPage } from 'next';
import ContinentsQuery from '../../../../graphql/queries/continents/continents-query.graphql';
import React from 'react';
import { Column, useTable } from 'react-table';
import { useRouter } from 'next/router';
import useAppQuery from '../../../../use-app-query';

const Continents: NextPage<any> = () => {
  const router = useRouter();
  const columns = React.useMemo<Column[]>(
    () => [
      {
        Header: 'ID',
        accessor: 'node.id',
      },
      {
        Header: 'Name',
        accessor: 'node.name',
      },
    ],
    [],
  );
  const { data, error } = useAppQuery(ContinentsQuery);
  const tableInstance = useTable({
    columns,
    data: data?.continents.edges ?? [],
  });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  console.log('data', data, error);
  return (
    <>
      <h1 className="bp4-heading">Continents</h1>
      <table
        className="bp4-html-table bp4-html-table-bordered bp4-html-table-striped bp4-interactive"
        {...getTableProps()}
        style={{ width: '100%' }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                onClick={(event) =>
                  router.push(`/continents/${row.values['node.id']}`)
                }
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Continents;
