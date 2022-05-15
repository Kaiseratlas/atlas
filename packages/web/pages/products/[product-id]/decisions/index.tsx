import { NextPage } from 'next';
import React from 'react';
import DecisionsQuery from '../../../../graphql/queries/decisions/decisions-query.graphql';
import { Callout } from '@blueprintjs/core';
import useAppQuery from '../../../../use-app-query';
import { Column, useTable } from 'react-table';

const Decisions: NextPage<any> = () => {
  const { data, error } = useAppQuery(DecisionsQuery);
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

  const tableInstance = useTable({
    columns,
    data: data?.decisions.edges ?? [],
  });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  console.log('data', data, error);
  return (
    <>
      <h1 className="bp4-heading">Decisions</h1>
      {error && <Callout intent="danger">{error.message}</Callout>}
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
                // onClick={(event) =>
                //   router.push(`/continents/${row.values['node.id']}`)
                // }
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

export default Decisions;
