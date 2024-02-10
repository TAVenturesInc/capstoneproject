import React from "react";
import generateUniqueId from "generate-unique-id";
import { Button, Form } from "react-bootstrap";

export const NewAction = ({ currentIndex, onChange, pages }) => {
  const [name, setName] = React.useState("");
  const [destination, setDestination] = React.useState("");

  const addAction = () => {
    onChange({
      name: name,
      destination: destination,
      id: generateUniqueId(),
    });
    setName("");
    setDestination("");
  };

  return (
    <div className="row" style={{ paddingBottom: "6px" }}>
      <div className="col col-lg-1">
        {Boolean(name) && Boolean(destination) && (
          <Button variant="outline-success" onClick={addAction}>
            Add
          </Button>
        )}
      </div>
      <div className="col col-lg-3">
        <Form.Control
          aria-describedby="title"
          id="title"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="col col-lg-2">
        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        >
          <option value="">Select Page</option>
          {pages.map((page, index) => (
            <option
              disabled={index === currentIndex}
              key={`${page.id}`}
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
