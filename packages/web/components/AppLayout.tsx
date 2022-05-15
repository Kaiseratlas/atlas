import React from 'react';
import { Button, Card, Navbar } from '@blueprintjs/core';
import Sidebar from './Sidebar';
import Search from './Search';

const AppLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar fixedToTop>
        <Navbar.Group style={{ minWidth: 375 }}>
          <Button icon="menu" minimal />
          <Navbar.Divider />
          <Navbar.Heading>Kaiseratlas</Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group>
          <Navbar.Divider />
          <Search />
        </Navbar.Group>
      </Navbar>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <Card style={{ width: '100%', marginLeft: 400 }}>{children}</Card>
      </div>
    </>
  );
};

export default AppLayout;
