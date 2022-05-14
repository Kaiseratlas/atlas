import { NextPage } from 'next';
import { useRouter } from 'next/router';
import StatesQuery from '../../../../graphql/queries/states/states-query.graphql';
import React from 'react';
import useAppQuery from '../../../../use-app-query';
import { Column, useTable } from 'react-table';
import Link from 'next/link';
import { Checkbox } from '@blueprintjs/core';
import Image from 'next/image';
import CountryLink from '../../../../components/CountryLink';

const States: NextPage<any> = () => {
  const router = useRouter();
  const { data, error } = useAppQuery(StatesQuery);
  console.log('data', data, error);
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
      {
        Header: 'Controller',
        accessor: 'node.controller',
        Cell: ({ value }) => <CountryLink country={value} />,
      },
      {
        Header: 'Category',
        accessor: 'node.category',
        Cell: ({ value }) => (
          <Link
            href={{
              pathname:
                '/products/[product-id]/states/categories/[state-category-id]',
              query: {
                ...router.query,
                'state-category-id': value.id,
              },
            }}
          >
            {value.name}
          </Link>
        ),
      },
      {
        Header: 'Is Impassable?',
        accessor: 'node.impassable',
        Cell: ({ value }) => (
          <span style={{ textAlign: 'center' }}>
            <Checkbox checked={value} readOnly style={{ margin: 0 }} />
          </span>
        ),
      },
      {
        Header: 'Population',
        accessor: 'node.manpower',
        Cell: ({ value }) => (
          <div style={{ textAlign: 'right' }}>
            {new Intl.NumberFormat().format(value)}
          </div>
        ),
      },
    ],
    [router.query],
  );
  const tableInstance = useTable({
    columns,
    data: data?.states.edges ?? [],
  });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  return (
    <>
      <h1 className="bp4-heading">States</h1>
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
    </>
  );
};

export default States;
