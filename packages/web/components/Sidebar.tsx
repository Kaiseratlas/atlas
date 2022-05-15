import React from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  Card,
  FormGroup,
  Icon,
  InputGroup,
  Position,
  Tabs,
} from '@blueprintjs/core';
import classNames from 'classnames';
import classes from './Sidebar.module.scss';
import { Tooltip2 } from '@blueprintjs/popover2';
import { useQuery } from '@apollo/client';
import ProductsQuery from '../graphql/queries/products/products-query.graphql';

const menu = [
  {
    key: 'abilities',
    title: 'Abilities',
    path: '/abilities',
  },
  {
    key: 'autonomousStates',
    title: 'Autonomous States',
    path: '/autonomous-states',
  },
  {
    key: 'buildings',
    title: 'Buildings',
    path: '/buildings',
  },
  {
    key: 'characters',
    title: 'Characters',
    path: '/characters',
  },
  {
    key: 'continents',
    title: 'Continents',
    path: '/continents',
  },
  {
    key: 'countries',
    title: 'Countries',
    path: '/countries',
  },
  {
    key: 'decisions',
    title: 'Decisions',
    path: '/decisions',
  },
  {
    key: 'difficultySettings',
    title: 'Difficulty Settings',
    path: '/difficulty-settings',
  },
  {
    key: 'focuses',
    title: 'Focuses',
    path: '/focuses',
  },
  {
    key: 'focusTrees',
    title: 'Focus Trees',
    path: '/focuses/trees',
  },
  {
    key: 'gameRules',
    title: 'Game Rules',
    path: '/game-rules',
  },
  {
    key: 'ideas',
    title: 'Ideas',
    path: '/ideas',
  },
  {
    key: 'ideologies',
    title: 'Ideologies',
    path: '/ideologies',
  },
  {
    key: 'intelligenceAgencies',
    title: 'Intelligence Agencies',
    path: '/intelligence-agencies',
  },
  {
    key: 'provinces',
    title: 'Provinces',
    path: '/provinces',
  },
  {
    key: 'resources',
    title: 'Resources',
    path: '/resources',
  },
  {
    key: 'sprites',
    title: 'Sprites',
    path: '/sprites',
  },
  {
    key: 'states',
    title: 'States',
    path: '/states',
  },
  {
    key: 'strategicRegions',
    title: 'Strategic Regions',
    path: '/strategic-regions',
  },
  {
    key: 'technologies',
    title: 'Technologies',
    path: '/technologies',
  },
  {
    key: 'terrainCategories',
    title: 'Terrain Categories',
    path: '/terrain/categories',
  },
  {
    key: 'units',
    title: 'Units',
    path: '/units',
  },
  {
    key: 'warGoals',
    title: 'War Goals',
    path: '/war-goals',
  },
];

const Sidebar: React.FC = () => {
  const router = useRouter();
  const { data } = useQuery(ProductsQuery);
  console.log('data', data);
  return (
    <div className={classes.sidebar}>
      <Card style={{ display: 'flex', flexDirection: 'column' }}>
        {data?.products.edges.map((edge: any) => (
          <>
            <Tooltip2 content={edge.node.title} position={Position.RIGHT}>
              <Button
                style={{
                  borderRadius: '50%',
                  width: 50,
                  height: 50,
                  marginBottom: 10,
                }}
              >
                <Button
                  style={{
                    backgroundImage: `url(${edge.node.logoUrl})`,
                    backgroundSize: 'cover',
                    borderRadius: '50%',
                  }}
                  large
                ></Button>
              </Button>
            </Tooltip2>
          </>
        ))}
        <Button
          icon="plus"
          style={{ borderRadius: '50%', width: 50, height: 50 }}
        ></Button>
      </Card>
      <Card style={{ width: '100%' }}>
        <p
          className="bp4-text-disabled bp4-text-small"
          style={{
            textTransform: 'uppercase',
            fontWeight: 500,
            letterSpacing: 1,
          }}
        >
          Contents
        </p>
        <Tabs
          className={classes.tabs}
          vertical
          onChange={async (newTabId) => {
            const item = menu.find((m) => m.key === newTabId);
            if (item) {
              await router.push(`/products/kaiserreich${item.path}`);
            }
          }}
        >
          {menu.map((m) => (
            <Tabs.Tab
              key={m.key}
              id={m.key}
              title={m.title}
              style={{ width: '100%' }}
            />
          ))}
        </Tabs>
      </Card>
    </div>
  );
};

export default Sidebar;
