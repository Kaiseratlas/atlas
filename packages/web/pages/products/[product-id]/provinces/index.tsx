import { NextPage } from 'next';
import ProvincesQuery from '../../../../graphql/queries/provinces/provinces-query.graphql';
import useAppQuery from '../../../../use-app-query';
import React from 'react';
import { Column, useTable } from 'react-table';
import { useRouter } from 'next/router';
import { Button, ButtonGroup, Checkbox, Tag } from '@blueprintjs/core';
import Link from 'next/link';

const Provinces: NextPage<any> = () => {
  const { data, error, refetch } = useAppQuery(ProvincesQuery);
  const router = useRouter();

  const columns = React.useMemo<Column[]>(
    () => [
      {
        Header: 'ID',
        accessor: 'node.id',
      },
      {
        Header: 'Type',
        accessor: 'node.type',
      },
      {
        Header: 'Color',
        accessor: 'node.color',
        Cell: ({ value }) => (
          <>
            {/*<Tag style={{ backgroundColor: `rgb(${value.join()})` }} />{' '}*/}
            {value.join(', ')}
          </>
        ),
      },
      {
        Header: 'Is Coastal?',
        accessor: 'node.isCoastal',
        Cell: ({ value }) => (
          <span style={{ textAlign: 'center' }}>
            <Checkbox checked={value} readOnly style={{ margin: 0 }} />
          </span>
        ),
      },
      {
        Header: 'Category',
        accessor: 'node.terrainCategory',
        Cell: ({ value }) => (
          <>
            <Link href={`/terrain/categories/${value.id}`}>
              <a>{value.name}</a>
            </Link>
          </>
        ),
      },
      {
        Header: 'Continent',
        accessor: 'node.continent',
        Cell: ({ value }) => (
          <>
            {value && (
              <Link
                href={{
                  pathname: '/products/[product-id]/continent/[continent-id]',
                  query: {
                    ...router.query,
                    'continent-id': value.id,
                  },
                }}
              >
                <a>{value.name}</a>
              </Link>
            )}
          </>
        ),
      },
    ],
    [router.query],
  );

  const tableInstance = useTable({
    columns,
    data: data?.provinces.edges ?? [],
  });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  console.log('data', data);
  return (
    <>
      <h1 className="bp4-heading">Provinces</h1>
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
      <ButtonGroup minimal>
        <Button
          icon="caret-left"
          onClick={async () => {
            const before = data?.provinces.edges[0].cursor;
            await refetch({ last: 10, before, first: null, after: null });
          }}
        >
          Prev
        </Button>
        <Button
          rightIcon="caret-right"
          onClick={async () => {
            const after =
              data?.provinces.edges[data.provinces.edges.length - 1].cursor;
            await refetch({ first: 10, after, last: null, before: null });
          }}
        >
          Next
        </Button>
      </ButtonGroup>
    </>
  );
};

export default Provinces;
