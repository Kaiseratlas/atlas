import { NextPage } from 'next';
import React from 'react';
import TechnologyQuery from '../../../../graphql/queries/technologies/technologies-query.graphql';
import useAppQuery from '../../../../use-app-query';
import { Button, ButtonGroup } from '@blueprintjs/core';
import { Column, useTable } from 'react-table';

const Technologies: NextPage<any> = () => {
  const { data, error, refetch } = useAppQuery(TechnologyQuery);
  const columns = React.useMemo<Column[]>(
    () => [
      {
        Header: 'ID',
        accessor: 'node.id',
      },
      {
        Header: 'Name',
        id: 'name',
        accessor: 'node.name',
      },
    ],
    [],
  );
  const tableInstance = useTable({
    columns,
    data: data?.technologies.edges ?? [],
  });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  console.log('data', data, error);
  return (
    <>
      <h1 className="bp4-heading">Technologies</h1>
      <table
        className="bp4-html-table bp4-html-table-bordered bp4-html-table-striped"
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
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <ButtonGroup minimal>
        <Button
          icon="caret-left"
          onClick={async () => {
            const before = data?.technologies.edges[0].cursor;
            await refetch({ last: 10, before, first: null, after: null });
          }}
        >
          Prev
        </Button>
        <Button
          rightIcon="caret-right"
          onClick={async () => {
            const after =
              data?.technologies.edges[data.technologies.edges.length - 1]
                .cursor;
            await refetch({ first: 10, after, last: null, before: null });
          }}
        >
          Next
        </Button>
      </ButtonGroup>
    </>
  );
};

export default Technologies;
