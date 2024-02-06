import React from "react";
import { useGameContext } from "../../context";

import { Game } from "./game";

export default function GameList() {
  const { games, loading, loaded, errorList, actions } = useGameContext();

  const deleteGame = (id) => actions?.deleteGame(id);

  React.useEffect(() => {
    actions?.refreshGameList();
  }, []);

  return (
    <div>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Level</th>
            <th>Author</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <Game {...game} key={game._id} deleteGame={deleteGame} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
