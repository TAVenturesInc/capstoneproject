import React from "react";
import { Button, Form } from "react-bootstrap";
import generateUniqueId from "generate-unique-id";

import { rowStyle } from "../styles";

const PointOfInterest = ({
  index,
  newPoi = false,
  onChange,
  removePOI,
  pointOfInterest,
}) => {
  const [name, setName] = React.useState(pointOfInterest?.name || "");
  const [hoverText, setHoverText] = React.useState(
    pointOfInterest?.hoverText || ""
  );
  const onClick = () => {
    if (newPoi) {
      onChange({ id: generateUniqueId(), name, hoverText });
    } else {
      onChange({ ...pointOfInterest, name, hoverText }, index);
    }
  };

  return (
    <div className="row" style={rowStyle}>
      <div className="col col-lg-1">
        {newPoi ? (
          <Button variant="outline-danger" onClick={onClick}>
            +
          </Button>
        ) : (
          <Button variant="outline-danger" onClick={() => removePOI(index)}>
            -
          </Button>
        )}
      </div>
      <div className="col col-lg-5">
        <Form.Group>
          <Form.Control
            onChange={(e) => setName(e.target.value)}
            placeholder="Item name"
            type="text"
            value={name}
          />
          <Form.Control
            onChange={(e) => setHoverText(e.target.value)}
            placeholder="Hover over text"
            type="text"
            value={hoverText}
          />
        </Form.Group>
        <Form.Control as="textarea" rows={3} />
      </div>
    </div>
  );
};

export const PointsOfInterest = ({ pointsOfInterest, setPointsOfInterest }) => {
  const onChange = (poi, index) => {
    const newPointsOfInterest = [...pointsOfInterest];
    newPointsOfInterest[index] = poi;
    setPointsOfInterest(newPointsOfInterest);
  };
  const removePOI = (index) => {
    const newPointsOfInterest = [...pointsOfInterest];
    newPointsOfInterest.splice(index, 1);
    setPointsOfInterest(newPointsOfInterest);
  };

  return (
    <>
      <div className="row" style={rowStyle}>
        <div className="col col-lg-6">
          <h3>Points of Interest</h3>
        </div>
      </div>
      <div className="row" style={rowStyle}>
        <div className="col col-lg-6">
          <Form.Text id="pointsOfInterestHelpBlock" muted>
            Add points of interest to your game. These will be used to help
            players navigate the game world. Within the content of your page add
            the syntax of your point of interest like so:&nbsp;
            <code>(point_of_interest)[#]</code>.
          </Form.Text>
        </div>
      </div>
      {pointsOfInterest.map((poi, index) => (
        <PointOfInterest
          index={index}
          key={poi.id}
          onChange={onChange}
          pointOfInterest={poi}
          removePOI={removePOI}
        />
      ))}
      <PointOfInterest
        index={pointsOfInterest.length}
        onChange={onChange}
        newPoi
      />
    </>
  );
};
