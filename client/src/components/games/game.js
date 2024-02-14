import React from "react";
import { Link } from "react-router-dom";

export const Game = ({
  _id,
  author,
  deleteGame,
  description,
  downloadGame,
  genre,
  loading,
  title,
}) => {
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
      <td>{author}</td>
      <td>{genre}</td>
      <td>{description}</td>
      <td>
        <Link className="btn btn-link" to={`/games/edit/${_id}`}>
          Edit
        </Link>
      </td>
      <td>
        <Link className="btn btn-link" target={"_blank"} to={`/game/${_id}`}>
          Play
        </Link>
      </td>
      <td>
        <Link
          className="btn btn-link"
          disabled={loading}
          onClick={() => downloadGame(_id)}
        >
          Download
        </Link>
      </td>
      <td>
        <button className="btn btn-link" onClick={confirmDeletion}>
          Delete
        </button>
      </td>
    </tr>
  );
};
