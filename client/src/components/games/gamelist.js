/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Button, Form } from "react-bootstrap";

import { Game } from "./game";
import { useGameContext, useLoginContext } from "../../context";
import { useStyleContext } from "../../context/styleContext";


export default function GameList() {
  const [search, setSearch] = React.useState("");
  const regex = new RegExp(search, "i");
  
  const {
    gameData,
    games = [],
    gamesLoading,
    gamesLoaded,
    actions,
  } = useGameContext();
  const { userId } = useLoginContext();
  const theme = useStyleContext();

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
  console.log(games);
  const gameList = games
    ?.filter(
      ({ description, genre, title, userName }) =>
        (description || "").match(regex) ||
        (genre || "").match(regex) ||
        (title || "").match(regex) ||
        (userName || "").match(regex)
    )
    .map((game) => ({
      ...game,
      userData: gameData?.find((data) => data._game === game._id),
    }));

  React.useEffect(() => {
    actions?.refreshGameList();
  }, []);

  React.useEffect(() => {
    userId && actions?.getUserGameData(userId);
  }, [userId]);

  return (
    <div id={theme} className="card" style={{ margin: "2rem 4rem" }}>
      <div className="card-body">
        <div className="row">
          <div className="col-6">
            <h3 id={theme.theme} className="font_64">Game List</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <Form.Control
              aria-describedby="searchHelpBlock"
              id="search"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Form.Text id={theme.theme} className="font2 searchHelpBlock" muted>
              Find a game by title, author, or genre.
            </Form.Text>
          </div>
          <div className="col-2">
            <Button id={theme.theme} className="font2 create" variant="primary" disabled={gamesLoading} href="/games/new">
              Create New Game
            </Button>
          </div>
          <div className="col-4">
            <Form.Group className="mb-3">
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
            <tr >
              <th id={theme.theme} className="font_64 tableHeader" style={{textAlign: "left"}}>Title</th>
              <th id={theme.theme} className="font_64 tableHeader" style={{textAlign: "left"}}>Author</th>
              <th id={theme.theme} className="font_64 tableHeader" style={{textAlign: "left"}}>Genre</th>
              <th id={theme.theme} className="font_64 tableHeader" style={{textAlign: "left"}}>Game Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {gamesLoaded &&
              gameList.map((game) => (
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
