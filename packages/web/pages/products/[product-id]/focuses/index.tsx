import { NextPage } from 'next';
import React from 'react';
import { useQuery } from '@apollo/client';
import FocusesQuery from '../../../../graphql/queries/focuses/focuses-query.graphql';
import { Card } from '@blueprintjs/core';
import Focus from '../../../../components/Focus';
import { Column, useTable } from 'react-table';
import { useRouter } from 'next/router';

const Focuses: NextPage<any> = () => {
  const router = useRouter();
  const { data } = useQuery(FocusesQuery, {
    context: {
      headers: {
        'X-Product-Name': 'kaiserreich',
        'X-Product-Version': '0.20.1',
      },
    },
  });

  console.log('data', data);
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
      {
        Header: 'Cost',
        id: 'cost',
        accessor: 'node.cost',
      },
    ],
    [],
  );
  const tableInstance = useTable({
    columns,
    data: data?.focuses.edges ?? [],
  });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div>
      <h1 className="bp4-heading">Focuses</h1>
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
                onClick={() =>
                  router.push({
                    pathname: '/products/[product-id]/focuses/[focus-id]',
                    query: {
                      ...router.query,
                      'focus-id': row.values['node.id'],
                    },
                  })
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
      {/*<div style={{ display: 'flex', flex: '1 0 18%', flexWrap: 'wrap' }}>*/}
      {/*  {data?.focuses.edges.map((edge: any) => {*/}
      {/*    return <Focus key={edge.cursor} focus={edge.node} />;*/}
      {/*  })}*/}
      {/*</div>*/}
    </div>
  );
};

export default Focuses;
