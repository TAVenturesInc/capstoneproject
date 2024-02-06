import React from "react";
import { Link } from "react-router-dom";

export const Game = ({ _id, author, deleteGame, field, name, rating }) => (
  <tr>
    <td>{name}</td>
    <td>{rating}</td>
    <td>{field}</td>
    <td>{author}</td>
    <td>
      <Link className="btn btn-link" to={`/games/edit/${_id}`}>
        Edit
      </Link>
    </td>
    <td>
      <button className="btn btn-link" onClick={() => deleteGame(_id)}>
        Delete
      </button>
    </td>
  </tr>
);
