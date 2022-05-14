import React from 'react';
import classes from './Focuses.module.scss';

const Focus: React.FC<any> = ({ focus }) => {
  return (
    <div className={classes.focus}>
      <div className={classes.focus__name}>{focus.name}</div>
      <div
        className={classes.focus__icon}
        style={{ backgroundImage: `url(${focus.iconUrl})` }}
      />
    </div>
  );
};

export default Focus;
