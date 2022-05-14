import { NextPage } from 'next';
import SpritesQuery from '../../../../graphql/queries/sprites/sprites-query.graphql';
import React from 'react';
import { useQuery } from '@apollo/client';
import { Column, useTable } from 'react-table';

const Sprites: NextPage<any> = () => {
  const { data } = useQuery(SpritesQuery, {
    context: {
      headers: {
        'X-Product-Name': 'kaiserreich',
        'X-Product-Version': '0.20.1',
      },
    },
  });

  const columns = React.useMemo<Column[]>(
    () => [
      {
        Header: 'ID',
        accessor: 'node.id',
      },
      {
        Header: 'Texture File Path',
        accessor: 'node.textureFile',
      },
      {
        Header: 'Frames',
        accessor: 'node.noOfFrames',
      },
    ],
    [],
  );
  const tableInstance = useTable({
    columns,
    data: data?.sprites.edges ?? [],
  });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  return (
    <>
      <div>
        <h1 className="bp4-heading">Sprites</h1>
        <table
          className="bp4-html-table bp4-html-table-bordered bp4-html-table-striped bp4-interactive"
          {...getTableProps()}
          style={{ width: '100%' }}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </th>
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
    </>
  );
};

export default Sprites;
