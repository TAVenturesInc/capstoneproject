/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useParams /*, useNavigate*/ } from "react-router";
import generateUniqueId from "generate-unique-id";

import { Button } from "react-bootstrap";

import { Actions } from "./actions";
import { GameDetails } from "./gameDetails";
import { Page } from "./page";
import { useGameContext } from "../../context";

const Creator = () => {
  const [gameData, setGameData] = React.useState({
    description: "",
    genre: "",
    title: "",
  });
  const [gameContent, setGameContent] = React.useState([
    {
      actions: [],
      id: generateUniqueId(),
      title: "",
      value: "",
    },
  ]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const { actions, currentGame } = useGameContext();
  const { id } = useParams();

  const updatePageActions = (actions = []) => {
    const newContent = [...gameContent];
    newContent[currentIndex].actions = actions;
    setGameContent(newContent);
  };

  const currentPage = gameContent[currentIndex];

  const updateGameData = () => {
    if (currentGame?._id) {
      actions.updateGameData(currentGame._id, {
        ...gameData,
        content: JSON.stringify(gameContent),
      });
    } else {
      actions.createGameData({
        ...gameData,
        content: JSON.stringify(gameContent),
      });
    }
  };

  React.useEffect(() => {
    if (currentGame) {
      setGameData({
        title: currentGame.title,
        description: currentGame.description,
        genre: currentGame.genre,
      });
      setGameContent(JSON.parse(currentGame.content));
    }
  }, [Boolean(currentGame)]);

  React.useEffect(() => {
    if (id) {
      actions.getGameData(id);
    } else {
      setGameData({
        title: "",
        description: "",
        genre: "",
      });
      setGameContent([
        {
          actions: [],
          id: generateUniqueId(),
          title: "Page 1",
          value: "#### Example Page Content \n- Thing 1\n- Thing 2\n- Thing 3",
        },
      ]);
    }
  }, [id]);

  return (
    <div className="card">
      <div className="card-body">
        <div className="container form-group">
          <GameDetails gameData={gameData} onChange={setGameData} />
          <Page
            currentIndex={currentIndex}
            currentPage={currentPage}
            gameContent={gameContent}
            setCurrentIndex={setCurrentIndex}
            setGameContent={setGameContent}
          />
          <Actions
            actions={currentPage.actions}
            onChange={updatePageActions}
            pages={gameContent}
          />
          <div className="row">
            <div className="col col-lg-6">
              <Button variant="primary" onClick={updateGameData}>
                Update Game Data
              </Button>{" "}
              <Button variant="outline-primary">Preview Game</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creator;
