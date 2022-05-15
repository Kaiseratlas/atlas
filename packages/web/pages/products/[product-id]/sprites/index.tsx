import { NextPage } from 'next';
import SpritesQuery from '../../../../graphql/queries/sprites/sprites-query.graphql';
import React from 'react';
import { Column, useTable } from 'react-table';
import useAppQuery from '../../../../use-app-query';
import { useRouter } from 'next/router';
import { Button, ButtonGroup } from '@blueprintjs/core';

const Sprites: NextPage<any> = () => {
  const router = useRouter();
  const { data, refetch } = useAppQuery(SpritesQuery);

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
                <tr
                  {...row.getRowProps()}
                  onClick={() =>
                    router.push({
                      pathname: '/products/[product-id]/sprites/[sprite-id]',
                      query: {
                        ...router.query,
                        'sprite-id': row.values['node.id'],
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
        <ButtonGroup minimal>
          <Button
            icon="caret-left"
            onClick={async () => {
              const before = data?.sprites.edges[0].cursor;
              await refetch({ last: 10, before, first: null, after: null });
            }}
          >
            Prev
          </Button>
          <Button
            rightIcon="caret-right"
            onClick={async () => {
              const after =
                data?.sprites.edges[data.sprites.edges.length - 1].cursor;
              await refetch({ first: 10, after, last: null, before: null });
            }}
          >
            Next
          </Button>
        </ButtonGroup>
      </div>
    </>
  );
};

export default Sprites;
