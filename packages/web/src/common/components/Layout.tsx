import React from "react";
import Nav from "./Nav";
import Sidebar from "./Sidebar";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Nav />
      <div className="container-fluid" style={{ background: "white" }}>
        <div className="row">
          <Sidebar />
          <div className="col-lg-10 pl-md-5 py-md-3">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
