import React from "react";
import { Button, Menu, Popover } from "@blueprintjs/core";

const VersionPopover: React.FC = () => {
  return (
    <Popover
      position="bottom"
      content={
        <Menu>
          <Menu.Item text="fgfdgfd" />
          <Menu.Item text="fgfdgfd" />
        </Menu>
      }
    >
      <Button minimal icon="tag">
        Latest version
      </Button>
    </Popover>
  );
};

export default VersionPopover;
