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
}) => (
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
      <Link className="btn btn-link" to={`/game/${_id}`}>
        Preview
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
      <button className="btn btn-link" onClick={() => deleteGame(_id)}>
        Delete
      </button>
    </td>
  </tr>
);
