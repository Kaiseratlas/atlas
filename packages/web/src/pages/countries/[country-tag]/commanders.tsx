import { NextPage } from "next";
import React from "react";

const Commanders: NextPage<{ country: any }> = ({ country }) => {
  return (
    <>
      <div className="row">
        <div className="col-lg-9">
          <h1>Leaders</h1>
        </div>
      </div>
    </>
  );
};

export default Commanders;
