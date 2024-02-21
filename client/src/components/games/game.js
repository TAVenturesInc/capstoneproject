import React from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

import { useLoginContext } from "../../context";

export const Game = ({
  _id,
  deleteGame,
  description,
  downloadGame,
  genre,
  loading,
  title,
  userId,
  userName,
}) => {
  const { userId: currentUserId } = useLoginContext();
  const confirmDeletion = async () => {
    const confirmation = await window.confirm(
      "Are you sure you want to delete this game?"
    );
    if (confirmation) deleteGame(_id);
  };

  return (
    <tr>
      <td>{title}</td>
      <td>{userName}</td>
      <td>{genre}</td>
      <td>{description}</td>
      <td style={{ textAlign: "right" }}>
        {userId === currentUserId ? (
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Actions
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href={`/game/${_id}`} target="_blank">
                Play
              </Dropdown.Item>
              <Dropdown.Item href={`/qr/${_id}`} target="_blank">
                Shareable QR Code`
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
