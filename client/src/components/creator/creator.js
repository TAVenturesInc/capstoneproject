import React from "react";
import ReactMarkdown from "react-markdown";
import { useParams /*, useNavigate*/ } from "react-router";

import { Button, Dropdown } from "react-bootstrap";

import { genreList } from "../../genres";
import { useGameContext } from "../../context";

const Creator = () => {
  const { actions } = useGameContext();
  const { id } = useParams();

  const [gameData, setGameData] = React.useState({
    title: "",
    description: "",
    genre: "",
  });
  const [gameContent, setGameContent] = React.useState([
    { title: "", value: "" },
  ]);
  const [currentIndex, setCurrentIndex] = React.useState(0);

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
        newContent[currentIndex].title = value;
        return newContent;
      });
    },
    updatePageContent = (e) => {
      const value = e.target.value;
      setGameContent((prev) => {
        const newContent = [...prev];
        newContent[currentIndex].value = value;
        return newContent;
      });
    };

  const currentPage = gameContent[currentIndex];

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

              <label htmlFor="contentTitle">Page Title</label>
              <input
                className="form-control"
                id="contentTitle"
                onChange={updatePageTitle}
                type="text"
                value={currentPage.title}
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
                value={currentPage.value}
              />
              <br />
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Current Page: {currentPage.title}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {gameContent.map(({ title }, index) => (
                    <Dropdown.Item
                      key={`${title.replace(" ", "")}-${index}`}
                      value={index}
                      onClick={() => setCurrentIndex(index)}
                    >
                      {title}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <br />
              <Button variant="primary" onClick={addPage}>
                Add / Update Game Data
              </Button>{" "}
              <Button
                variant="danger"
                disabled={gameContent.length === 1}
                onClick={removePage}
              >
                Remove Current Page
              </Button>
            </div>
            <div className="col col-lg-6">
              <h3>{currentPage.title}</h3>
              <ReactMarkdown>{currentPage.value}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creator;
