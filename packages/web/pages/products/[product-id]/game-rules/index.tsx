import { NextPage } from 'next';
import React from 'react';
import GameRulesQuery from '../../../../graphql/queries/game-rules/game-rules-query.graphql';
import useAppQuery from '../../../../use-app-query';
import { Select } from '@blueprintjs/select';
import { Button, FormGroup, Menu, MenuItem } from '@blueprintjs/core';
import { Tooltip2 } from '@blueprintjs/popover2';

const GameRuleSelect = Select.ofType<any>();

const GameRules: NextPage<any> = () => {
  const { data, error } = useAppQuery(GameRulesQuery);

  console.log('data', data, error);
  const groupMap = React.useMemo(() => {
    if (!data) {
      return new Map();
    }

    const entries = data.gameRules.edges.map((edge: any) => [
      edge.node.group.id,
      edge.node.group.name,
    ]);
    return new Map(entries);
  }, [data]);

  console.log('groupMap', groupMap);

  return (
    <>
      <h1 className="bp4-heading">Game Rules</h1>
      <table
        className="bp4-html-table bp4-html-table-bordered"
        style={{ width: '100%' }}
      >
        {Array.from(groupMap).map(([id, name]) => {
          return (
            <>
              <thead key={id}>
                <tr>
                  <th colSpan={2}>{name}</th>
                </tr>
              </thead>
              <tbody>
                {data?.gameRules.edges
                  .filter((edge: any) => edge.node.group.id === id)
                  .map((edge: any) => {
                    return (
                      <tr key={edge.cursor}>
                        <td>{edge.node.name}</td>
                        <td>
                          <GameRuleSelect
                            fill
                            filterable={false}
                            onItemSelect={() => {}}
                            items={edge.node.options}
                            popoverProps={{
                              position: 'bottom-left',
                            }}
                            itemRenderer={(option) => (
                              <MenuItem
                                text={
                                  <Tooltip2 content={option.description}>
                                    {option.text}
                                  </Tooltip2>
                                }
                              ></MenuItem>
                            )}
                          >
                            <Button
                              alignText="left"
                              fill
                              text={edge.node.options[0].text}
                              rightIcon="chevron-down"
                            />
                          </GameRuleSelect>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </>
          );
        })}
      </table>
    </>
  );
};

export default GameRules;
