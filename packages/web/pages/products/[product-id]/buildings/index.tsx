import { NextPage } from 'next';
import React from 'react';
import BuildingsQuery from '../../../../graphql/queries/buildings/buildings-query.graphql';
import useAppQuery from '../../../../use-app-query';
import { Column, useTable } from 'react-table';

const Buildings: NextPage<any> = () => {
  const { data, error } = useAppQuery(BuildingsQuery);
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
        Header: 'Base Cost',
        accessor: 'node.baseCost',
      },
      {
        Header: 'Base Cost Conversion',
        accessor: 'node.baseCostConversion',
      },
      {
        Header: 'Max Level',
        accessor: 'node.maxLevel',
      },
      {
        Header: 'Value',
        accessor: 'node.value',
      },
      {
        Header: 'Icon Frame',
        accessor: 'node.iconFrame',
      },
    ],
    [],
  );

  const tableInstance = useTable({
    columns,
    data: data?.buildings.edges ?? [],
  });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  console.log('data', data, error);
  return (
    <>
      <h1 className="bp4-heading">Buildings</h1>
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

export default Buildings;
