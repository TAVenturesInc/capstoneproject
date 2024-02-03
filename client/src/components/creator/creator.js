import React from "react";
import ReactMarkdown from "react-markdown";

import { Button, Dropdown } from "react-bootstrap";

const Creator = () => {
  const [gameData, setGameData] = React.useState({
    title: "",
    description: "",
    genre: "",
  });
  const [gameContent, setGameContent] = React.useState([
    {
      title: "Page 1",
      value: "#### Example Page Content \n- Thing 1\n- Thing 2\n- Thing 3",
    },
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

  return (
    <div className="card">
      <div className="card-body">
        <div className="container form-group">
          <div className="row">
            <h2 className="col">Design Your Game</h2>
          </div>
          <br />
          <div className="row">
            <div className="col col-lg-6">
              <label htmlFor="title">Title</label>
              <input
                className="form-control"
                id="title"
                onChange={(e) => setGameData({ title: e.target.value })}
                type="text"
                value={gameData.title}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col col-lg-6">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                id="description"
                onChange={(e) => setGameData({ description: e.target.value })}
                type="text"
                value={gameData.description}
              />
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col col-lg-6">
              <label htmlFor="genre">Genre</label>
              <input
                className="form-control"
                id="genre"
                onChange={(e) => setGameData({ genre: e.target.value })}
                type="text"
                value={gameData.genre}
              />
            </div>
          </div>
          <br />
          <hr />
          <br />
          <div className="row">
            <div className="col col-lg-6">
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
          <br />
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
            </div>
          </div>
          <br />
          <div className="row">
            <div className="col col-lg-3">
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
            </div>
            <div className="col col-lg-3">
              <Button variant="primary" onClick={addPage}>
                Add New Page
              </Button>
            </div>
            <div className="col col-lg-3">
              <Button
                variant="danger"
                disabled={gameContent.length === 1}
                onClick={removePage}
              >
                Remove Current Page
              </Button>
            </div>
          </div>
          <br />
          <div className="row">
            <h3>{currentPage.title}</h3>
            <ReactMarkdown>{currentPage.value}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creator;
