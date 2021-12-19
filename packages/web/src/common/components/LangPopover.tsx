import React from "react";
import { Button, Menu, Popover } from "@blueprintjs/core";

const LangPopover: React.FC = () => {
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
      <Button minimal icon="translate">
        English
      </Button>
    </Popover>
  );
};

export default LangPopover;
