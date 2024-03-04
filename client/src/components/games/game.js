import React from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

import { useLoginContext } from "../../context";

const completeStyle = {
  background: "rgb(255 255 255 / 15%)",
  border: "solid 1px rgb(89 137 209)",
  borderRadius: "8px",
  color: "rgb(89 137 209)",
  fontSize: "14px",
  marginLeft: "6px",
  padding: "2px 10px",
};
const startedStyle = {
  background: "rgb(255 255 255 / 15%)",
  border: "solid 1px rgb(137 227 185)",
  borderRadius: "8px",
  color: "rgb(137 227 185)",
  fontSize: "14px",
  marginLeft: "6px",
  padding: "2px 10px",
};

export const Game = ({
  _id,
  deleteGame,
  description,
  downloadGame,
  genre,
  title,
  userData,
  userId,
  userName,
}) => {
  const { userId: currentUserId } = useLoginContext();
  const { recentStart, recentEnd } = userData || {
    recentStart: "",
    recentEnd: "",
  };
  const confirmDeletion = async () => {
    const confirmation = await window.confirm(
      "Are you sure you want to delete this game?"
    );
    if (confirmation) deleteGame(_id);
  };

  return (
    <tr>
      <td className="tableRow">
        {title}
        {recentEnd && <span style={completeStyle}>Completed</span>}
        {recentStart && !recentEnd && <span style={startedStyle}>Started</span>}
      </td>
      <td className="tableRow">{userName}</td>
      <td className="tableRow">{genre}</td>
      <td className="tableRow">{description}</td>
      <td className="tableRow" style={{ textAlign: "right" }}>
        {userId === currentUserId ? (
          <Dropdown>
            <Dropdown.Toggle variant="success">Actions</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href={`/game/${_id}`} target="_blank">
                Play
              </Dropdown.Item>
              <Dropdown.Item href={`/qr/${_id}`} target="_blank">
                Shareable QR Code
              </Dropdown.Item>
              <Dropdown.Item href={`/games/edit/${_id}`}>Edit</Dropdown.Item>
              <Dropdown.Item onClick={() => downloadGame(_id)}>
                Download JSON
              </Dropdown.Item>
              <Dropdown.Item onClick={confirmDeletion}>
                Delete Game
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Link to={`/game/${_id}`}>Play</Link>
        )}
      </td>
    </tr>
  );
};
