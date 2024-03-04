/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import ReactMarkdown from "react-markdown";
import { Button, ButtonGroup } from "react-bootstrap";
import { useParams } from "react-router";

import { useGameContext, useLoginContext } from "../../context";

const GamePlayor = () => {
  const [currentPageId, setCurrentPageId] = React.useState(null);

  const { id, pageId } = useParams();
  const { userId } = useLoginContext();
  const { actions: gameActions, currentGame } = useGameContext();

  const currentPage = currentGame?.content.find(
    (page) => page.id === currentPageId
  );
  const goToStart = () =>
    setCurrentPageId(currentGame?.startingPage || currentGame?.content[0]?.id);

  const { title = "", description = "" } = currentGame || {};
  const {
    actions = [],
    value = "",
    endNode = false,
    endState = "",
  } = currentPage || {};

  React.useEffect(() => {
    if (id) {
      gameActions.getGameData(id);
    }
  }, []);

  React.useEffect(() => {
    if (!pageId && id && userId) {
      gameActions.updateUserGameStatus(id, userId, { start: true });
    }
  }, [id, userId, pageId]);

  React.useEffect(() => {
    if (!pageId && id && userId && endNode) {
      gameActions.updateUserGameStatus(id, userId, {
        end: true,
        status: endState,
      });
    }
  }, [id, userId, pageId, endNode]);

  React.useEffect(() => {
    if (currentGame?.content?.length && currentPageId === null) {
      if (pageId) {
        setCurrentPageId(pageId);
      } else {
        goToStart();
      }
    }
  }, [currentGame?.content?.length]);

  if (!currentGame || !currentPage) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card">
      <div className="card-body">
        <div className="container form-group">
          <div className="row">
            <div className="col-md-12">
              <h1 className="font_64">{title}</h1>
            </div>
          </div>
          <div className="row">
            <div className="font2 col-md-12">
              <p>{description}</p>
              <ReactMarkdown>{value}</ReactMarkdown>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div>
                <ButtonGroup>
                  {actions.map(({ name, id, destination }) => (
                    <Button
                      key={id}
                      onClick={() => setCurrentPageId(destination)}
                    >
                      {name}
                    </Button>
                  ))}
                </ButtonGroup>
              </div>
              &nbsp;
              <div>
                <Button variant="outline-primary" href="/games">
                  Quit
                </Button>
                &nbsp;
                {endNode && (
                  <Button variant="outline-warning" onClick={goToStart}>
                    Start Over
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePlayor;
