import React from "react";

import { Action } from "./action";
import { NewAction } from "./newAction";

export const Actions = ({
  actions = [],
  currentIndex,
  onChange,
  pages = [],
}) => {
  const changeAction = ({ name, destination, id }) => {
    let index = actions.findIndex((action) => action.id === id);
    if (index === -1) index = actions.length;
    const newActions = [...actions];
    newActions[index] = { id, name, destination };
    onChange(newActions);
  };
  const removeAction = (id) => {
    const newActions = [...actions].filter((action) => action.id !== id);
    onChange(newActions);
  };

  return (
    <>
      <br />
      <div className="row">
        <div className="col col-lg-6">
          <h3>Action Page Actions</h3>
        </div>
      </div>
      <div className="row">
        <div className="col col-lg-1"></div>
        <div className="col col-lg-3">
          <label>Action Text</label>
        </div>
        <div className="col col-lg-2">
          <label>Destination</label>
        </div>
      </div>

      {actions.map((action) => (
        <Action
          action={action}
          currentIndex={currentIndex}
          key={action.id}
          onChange={changeAction}
          pages={pages}
          removeAction={removeAction}
        />
      ))}
      <NewAction
        onChange={changeAction}
        pages={pages}
        currentIndex={currentIndex}
      />
    </>
  );
};
