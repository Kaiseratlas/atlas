import React from "react";
import { Button, ButtonGroup, Menu, Navbar, Popover } from "@blueprintjs/core";
import classNames from "classnames";
import styles from "./Nav.module.scss";
import VersionPopover from './VersionPopover';
import LangPopover from './LangPopover';

const Nav: React.FC = () => {
  return (
    <Navbar
      fixedToTop
      className={classNames("container-fluid bp3-dark", styles.nav)}
    >
      <div className="row">
        <Navbar.Group className="col-lg-2" style={{ textAlign: "center" }}>
          <Navbar.Heading style={{ width: "100%" }}>
            The Kaiserreich Atlas
          </Navbar.Heading>
        </Navbar.Group>
        <div className="col-lg-10">
          <Navbar.Group align="right">
            <LangPopover />
            <Navbar.Divider />
            <VersionPopover />
            <Navbar.Divider />
            <ButtonGroup minimal>
              <Button>Reddit</Button>
              <Button>GitHub</Button>
              <Button>Discord</Button>
            </ButtonGroup>
          </Navbar.Group>
        </div>
      </div>
    </Navbar>
  );
};

export default Nav;
