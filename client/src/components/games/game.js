import React from "react";
import { Link } from "react-router-dom";

import { useLoginContext } from "../../context";
//import QRGenerator from "../qrcode";

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
    if (confirmation) {
      deleteGame(_id);
    }
  };
  return (
    <tr>
      <td>{title}</td>
      <td>{userName}</td>
      <td>{genre}</td>
      <td>{description}</td>
      <td style={{ whiteSpace: "nowrap" }}>_
        <Link className="btn btn-link" target={"_blank"} to={`/game/${_id}`}>
          Play
        </Link>
        <Link className="btn btn-link" onClick={alert("you pushed the qr code button")}>
              QR
        </Link>
        {userId === currentUserId && (
          <>
            <Link className="btn btn-link" to={`/games/e{_dit/${_id}`}>
              Share
            </Link>
            <Link className="btn btn-link" to={`/games/edit/${_id}`}>
              Edit
            </Link>
            <Link
              className="btn btn-link"
              disabled={loading}
              onClick={() => downloadGame(_id)}
            >
              Download
            </Link>
            <button className="btn btn-link" onClick={confirmDeletion}>
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
};
