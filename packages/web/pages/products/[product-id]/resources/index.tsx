import { NextPage } from 'next';
import ResourcesQuery from '../../../../graphql/queries/resources/resources-query.graphql';
import React from 'react';
import { useQuery } from '@apollo/client';
import { Column, useTable } from 'react-table';
import { useRouter } from 'next/router';

const Resources: NextPage<any> = ({ resources }) => {
  const { data } = useQuery(ResourcesQuery, {
    context: {
      headers: {
        'X-Product-Name': 'kaiserreich',
        'X-Product-Version': '0.20.1',
      },
    },
  });

  console.log('data');

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
    data: data?.resources.edges ?? [],
  });

  const router = useRouter();
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <>
      <h1 className="bp4-heading">Resources</h1>
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
              <tr {...row.getRowProps()} onClick={event => router.push(`/resources/${row.values['node.id']}`)}>
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

export default Resources;
