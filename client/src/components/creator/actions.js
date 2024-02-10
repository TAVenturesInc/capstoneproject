import React from "react";
import generateUniqueId from "generate-unique-id";

import { Action } from "./action";

export const Actions = ({ onChange, actions = [], pages = [] }) => {
  const [newId, setNewId] = React.useState(generateUniqueId());

  const changeAction = ({ name, destination, id }) => {
    const newActions = [...actions];
    if (id === newId) {
      newActions.push({ name, destination, id });
      onChange(newActions);
      setNewId(generateUniqueId());
    } else {
      const index = actions.findIndex((action) => action.id === id);
      newActions[index] = { id, name, destination };
      onChange(newActions);
    }
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
        <div className="col col-lg-3">
          <label>Action Name</label>
        </div>
        <div className="col col-lg-3">
          <label>Action Destination</label>
        </div>
      </div>

      {actions.map((action) => (
        <Action
          action={action}
          key={action.id}
          onChange={changeAction}
          removeAction={removeAction}
          pages={pages}
        />
      ))}
      <Action
        action={{ name: "", destination: "", id: newId }}
        key={newId}
        onChange={changeAction}
        pages={pages}
      />
    </>
  );
};
