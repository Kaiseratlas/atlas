import React from "react";
import { Menu } from "@blueprintjs/core";
import styles from "./Sidebar.module.scss";
import classNames from "classnames";
import { useRouter } from "next/router";

const Sidebar: React.FC = () => {
  const { push, pathname } = useRouter();
  console.log("pathname", pathname);
  return (
    <div className={classNames("col-lg-2", styles.sidebar)}>
      <Menu className={styles.sidebar__menu}>
        <Menu.Item text="Geography" className={styles.sidebar__menu__title} />
        <Menu.Item
          text="Countries"
          className={classNames({
            [styles.sidebar__menu__active]: pathname.startsWith("/countries"),
          })}
          onClick={() => push("/countries")}
        />
        <Menu.Item text="States" />
        <Menu.Divider />
        <Menu.Item text="Politics" className={styles.sidebar__menu__title} />
        <Menu.Item
          text="Political Ideologies"
          className={classNames({
            [styles.sidebar__menu__active]: pathname.startsWith("/ideologies"),
          })}
          onClick={() => push("/ideologies")}
        />
        <Menu.Item text="Intelligence Agencies" />
        <Menu.Item text="Leaders" />
      </Menu>
    </div>
  );
};

export default Sidebar;
