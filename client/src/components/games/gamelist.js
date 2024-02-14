/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Button, Form } from "react-bootstrap";

import { Game } from "./game";
import { useGameContext } from "../../context";

export default function GameList() {
  const { games, gamesLoading, gamesLoaded /*, errorList*/, actions } =
    useGameContext();
  const deleteGame = (id) => actions?.deleteGame(id);

  const downloadGame = async (id) => {
    const game = await actions?.getGameData(id);
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(game)], {
      type: "application/json",
    });
    element.href = URL.createObjectURL(file);
    element.download = `${game.title}.json`;
    document.body.appendChild(element);
    element.opacity = 0;
    element.click();
    document.body.removeChild(element);
  };

  const handleFileUpload = async (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = async (e) => {
      const game = e.target.result;
      await actions.createGameData(JSON.parse(game));
      actions?.refreshGameList();
    };
  };

  React.useEffect(() => {
    actions?.refreshGameList();
  }, []);

  return (
    <div className="card" style={{ margin: "2rem 4rem" }}>
      <div className="card-body">
        <div className="row">
          <div className="col-6">
            <h3>Game List</h3>
          </div>
          <div className="col-2">
            <Button variant="primary" disabled={gamesLoading} href="/games/new">
              Create New Game
            </Button>
          </div>
          <div className="col-4">
            <Form.Group controlId="file" className="mb-3">
              <Form.Control
                accept="application/JSON"
                id="file"
                onChange={handleFileUpload}
                type="file"
              />
            </Form.Group>
          </div>
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
                <Game
                  {...game}
                  deleteGame={deleteGame}
                  downloadGame={downloadGame}
                  key={game._id}
                  loading={gamesLoading}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
