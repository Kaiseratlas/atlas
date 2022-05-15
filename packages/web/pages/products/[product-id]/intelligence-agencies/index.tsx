import { NextPage } from 'next';
import IntelligenceAgenciesQuery from '../../../../graphql/queries/intelligence-agencies/intelligence-agencies-query.graphql';
import React from 'react';
import { Column, useTable } from 'react-table';
import useAppQuery from '../../../../use-app-query';

const IntelligenceAgencies: NextPage<any> = () => {
  const { data } = useAppQuery(IntelligenceAgenciesQuery);

  const columns = React.useMemo<Column[]>(
    () => [
      {
        Header: 'Names',
        accessor: 'node.names',
      },
    ],
    [],
  );
  const tableInstance = useTable({
    columns,
    data: data?.intelligenceAgencies.edges ?? [],
  });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div>
      <h1 className="bp4-heading">Intelligence Agencies</h1>
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
              <tr {...row.getRowProps()}>
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
    </div>
  );
};

export default IntelligenceAgencies;
