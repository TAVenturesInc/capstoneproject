import React from "react";
import { Button, Form } from "react-bootstrap";

export const Action = ({
  action,
  currentIndex,
  onChange,
  pages,
  removeAction,
}) => {
  const changeField = (field) => (e) => {
    const value = e.target.value;
    onChange({
      name: action.name,
      destination: action.destination,
      id: action.id,
      [field]: value,
    });
  };
  const removeCurrentAction = () => removeAction(action.id);

  return (
    <div className="row" style={{ paddingBottom: "6px" }}>
      <div className="col col-lg-1">
        {removeAction && (
          <Button variant="outline-danger" onClick={removeCurrentAction}>
            &#8722;
          </Button>
        )}
      </div>
      <div className="col col-lg-3">
        <Form.Control
          aria-describedby="title"
          id="title"
          type="text"
          value={action.name}
          onChange={changeField("name")}
        />
      </div>
      <div className="col col-lg-2">
        <select
          value={action.destination}
          onChange={changeField("destination")}
        >
          <option value="">Select Page</option>
          {pages.map((page, index) => (
            <option
              disabled={index === currentIndex}
              key={`${page.id}-${action.id}`}
              value={page.id}
            >
              {page.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
