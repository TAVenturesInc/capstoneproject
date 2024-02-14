/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import ReactMarkdown from "react-markdown";
import { Button, ButtonGroup } from "react-bootstrap";
import { useParams } from "react-router";

import { useGameContext } from "../../context";

const GamePlayor = () => {
  const [currentPageId, setCurrentPageId] = React.useState(null);
  const { id, pageId } = useParams();
  const { actions, currentGame, ...rest } = useGameContext();

  React.useEffect(() => {
    if (id) {
      actions.getGameData(id);
    }
  }, []);

  React.useEffect(() => {
    if (currentGame?.content?.length && currentPageId === null) {
      if (pageId) {
        setCurrentPageId(pageId);
      } else {
        setCurrentPageId(
          currentGame?.startingPage || currentGame?.content[0]?.id
        );
      }
    }
  }, [currentGame?.content?.length]);

  const currentPage = currentGame?.content.find(
    (page) => page.id === currentPageId
  );

  console.log({ currentGame, rest });

  if (!currentGame || !currentPage) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card">
      <div className="card-body">
        <div className="container form-group">
          <div className="row">
            <div className="col-md-12">
              <h1>{currentGame.title}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <p>{currentGame.description}</p>
              <ReactMarkdown>{currentPage.value}</ReactMarkdown>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div>
                <ButtonGroup>
                  {currentPage.actions.map(({ name, id, destination }) => (
                    <Button
                      key={id}
                      onClick={() => setCurrentPageId(destination)}
                    >
                      {name}
                    </Button>
                  ))}
                </ButtonGroup>
                <Button variant="outline-primary" href="/games" > Quit </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePlayor;
