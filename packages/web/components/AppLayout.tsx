import React from 'react';
import { Button, Navbar, Tabs } from '@blueprintjs/core';
import { useRouter } from 'next/router';

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
    path: '/ia',
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
    path: '/terrain-categories',
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

const AppLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  return (
    <>
      <Navbar>
        <Navbar.Group>
          <Button icon="menu" minimal />
          <Navbar.Divider />
          <Navbar.Heading>Kaiseratlas</Navbar.Heading>
          <Navbar.Divider />
        </Navbar.Group>
      </Navbar>
      <div style={{ display: 'flex' }}>
        <div style={{ padding: 5 }}>
          <Tabs
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
                style={{ minWidth: 300 }}
              />
            ))}
          </Tabs>
        </div>
        <div style={{ padding: 5, width: '100%' }}>{children}</div>
      </div>
    </>
  );
};

export default AppLayout;
