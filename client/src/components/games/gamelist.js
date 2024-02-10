/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useGameContext } from "../../context";

import { Button } from "react-bootstrap";

import { Game } from "./game";

export default function GameList() {
  const { games, gamesLoading, gamesLoaded /*, errorList*/, actions } =
    useGameContext();
  const deleteGame = (id) => actions?.deleteGame(id);

  React.useEffect(() => {
    actions?.refreshGameList();
  }, []);

  return (
    <div className="card" style={{ margin: "2rem 4rem" }}>
      <div className="card-body">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h3>Game List</h3>
          <Button type="primary" disabled={gamesLoading} href="/games/new">
            Create New Game
          </Button>
        </div>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Game Description</th>
            </tr>
          </thead>
          <tbody>
            {gamesLoaded &&
              games.map((game) => (
                <Game {...game} key={game._id} deleteGame={deleteGame} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
