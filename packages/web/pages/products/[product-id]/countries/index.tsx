import type { NextPage } from 'next';
import CountriesQuery from '../../../../graphql/queries/countries/countries-query.graphql';
import React from 'react';
import useAppQuery from '../../../../use-app-query';
import { Column, useTable } from 'react-table';
import CountryLink from '../../../../components/CountryLink';
import { useRouter } from 'next/router';
import { BreadcrumbProps, Breadcrumbs, Button, ButtonGroup } from '@blueprintjs/core';

const Countries: NextPage<any> = () => {
  const router = useRouter();
  const { data, error, refetch } = useAppQuery(CountriesQuery);

  const BREADCRUMBS: BreadcrumbProps[] = [
    { href: '/products', text: 'Products' },
    {
      href: `/products/${router.query['product-id']}`,
      text: 'Kaiserreich',
    },
    {
      text: 'Countries',
    },
  ];
  const columns = React.useMemo<Column[]>(
    () => [
      {
        Header: 'ID',
        accessor: 'node.tag',
      },
      {
        Header: 'Name',
        accessor: 'node.formalName',
        Cell: ({ row }: any) => {
          return <CountryLink country={row.original['node']} />;
        },
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
    [],
  );
  const tableInstance = useTable({
    columns,
    data: data?.countries.edges ?? [],
  });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  console.log('data', data, error);
  return (
    <>
      <Breadcrumbs items={BREADCRUMBS} />
      <h1 className="bp4-heading">Countries</h1>
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
                //   router.push({
                //     pathname: '/products/[product-id]/countries/[country-tag]',
                //     query: {
                //       ...router.query,
                //       'country-tag': row.values.tag,
                //     },
                //   })
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
      <ButtonGroup minimal>
        <Button
          icon="caret-left"
          onClick={async () => {
            const before = data?.countries.edges[0].cursor;
            await refetch({ last: 10, before, first: null, after: null });
          }}
        >
          Prev
        </Button>
        <Button
          rightIcon="caret-right"
          onClick={async () => {
            const after =
              data?.countries.edges[data.countries.edges.length - 1].cursor;
            await refetch({ first: 10, after, last: null, before: null });
          }}
        >
          Next
        </Button>
      </ButtonGroup>
    </>
  );
};

export default Countries;
