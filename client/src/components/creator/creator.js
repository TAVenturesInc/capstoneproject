import React from "react";
import ReactMarkdown from "react-markdown";
import { useParams /*, useNavigate*/ } from "react-router";

import { Button, ButtonGroup, Dropdown } from "react-bootstrap";

import { genreList } from "../../genres";
import { useGameContext } from "../../context";

const Creator = () => {
  const [gameData, setGameData] = React.useState({
    description: "",
    genre: "",
    title: "",
  });
  const [gameContent, setGameContent] = React.useState([
    { title: "", value: "" },
  ]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const { actions, currentGame } = useGameContext();
  const { id } = useParams();

  const addPage = () => {
      setGameContent((prev) => [
        ...prev,
        {
          title: `Page ${prev.length + 1}`,
          value: "",
        },
      ]);
      setCurrentIndex(gameContent.length);
    },
    removePage = () => {
      setCurrentIndex(Math.max(0, currentIndex - 1));
      setGameContent((prev) => {
        const newContent = [...prev];
        newContent.splice(currentIndex, 1);
        return newContent;
      });
    },
    updatePageTitle = (e) => {
      const value = e.target.value;
      setGameContent((prev) => {
        const newContent = [...prev];
        const currentPage = newContent[currentIndex] || {
          title: "",
          value: "",
        };
        currentPage.title = value;
        newContent[currentIndex] = currentPage;
        return newContent;
      });
    },
    updatePageContent = (e) => {
      const value = e.target.value;
      setGameContent((prev) => {
        const newContent = [...prev];
        const currentPage = newContent[currentIndex] || {
          title: "",
          value: "",
        };
        currentPage.value = value;
        newContent[currentIndex] = currentPage;
        return newContent;
      });
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
          <div className="row">
            <div className="col col-lg-6">
              <h2>Design Your Game</h2>
              <label htmlFor="title">Title</label>
              <input
                className="form-control"
                id="title"
                onChange={(e) =>
                  setGameData({ ...gameData, title: e.target.value })
                }
                type="text"
                value={gameData.title}
              />
              <br />
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                id="description"
                onChange={(e) =>
                  setGameData({ ...gameData, description: e.target.value })
                }
                type="text"
                value={gameData.description}
              />
              <br />
              <label htmlFor="genre">Genre</label>
              <br />
              <select
                id="genre"
                onChange={(e) =>
                  setGameData({ ...gameData, genre: e.target.value })
                }
                value={gameData.genre}
              >
                {genreList.map((genre, index) => (
                  <option key={genre} value={index}>
                    {genre}
                  </option>
                ))}
              </select>
              <br />
              <br />

              <label htmlFor="contentTitle">Page Title</label>
              <input
                className="form-control"
                id="contentTitle"
                onChange={updatePageTitle}
                type="text"
                value={currentPage?.title || ""}
              />
            </div>
          </div>

          <div className="row">
            <div className="col col-lg-6">
              <label htmlFor="genre">
                Page Content (in{" "}
                <a href="https://www.markdownguide.org/cheat-sheet/">
                  MarkDown
                </a>
                )
              </label>
              <textarea
                className="form-control"
                id="genre"
                onChange={updatePageContent}
                style={{ minHeight: "112px" }}
                type="text"
                value={currentPage?.value || ""}
              />
              <br />
              <ButtonGroup>
                <Button variant="info" onClick={addPage} size="sm">
                  &#43; Add Page
                </Button>{" "}
                <Button
                  size="sm"
                  variant="danger"
                  disabled={gameContent.length === 1}
                  onClick={removePage}
                >
                  &#45; Remove Curernt Page
                </Button>
                <Dropdown size="sm">
                  <Dropdown.Toggle variant="light" id="dropdown-basic">
                    Current Page: {currentPage?.title || ""}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {gameContent.map((current, index) => {
                      const title = current?.title || "";
                      const header = title.replace(" ", "");
                      return (
                        <Dropdown.Item
                          key={`${header}-${index}`}
                          value={index}
                          onClick={() => setCurrentIndex(index)}
                        >
                          {title}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown>
              </ButtonGroup>
              <br />
              <br />
              <Button kind="primary" onClick={updateGameData}>
                Update Game Data
              </Button>
            </div>
            <div className="col col-lg-6">
              <h3>{currentPage?.title || ""}</h3>
              <ReactMarkdown>{currentPage?.value || ""}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creator;
