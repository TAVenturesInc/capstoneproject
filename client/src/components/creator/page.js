import ReactMarkdown from "react-markdown";
import generateUniqueId from "generate-unique-id";

import { Button, ButtonGroup, Dropdown, Form } from "react-bootstrap";

import { rowStyle } from "./styles";

export const Page = ({
  currentIndex,
  currentPage,
  gameContent,
  setCurrentIndex,
  setGameContent,
}) => {
  const addPage = () => {
    setGameContent((prev) => [
      ...prev,
      {
        actions: [],
        id: generateUniqueId(),
        title: `Page ${prev.length + 1}`,
        value: "",
      },
    ]);
    setCurrentIndex(gameContent.length);
  };

  const removePage = () => {
    setCurrentIndex(Math.max(0, currentIndex - 1));
    setGameContent((prev) => {
      const newContent = [...prev];
      newContent.splice(currentIndex, 1);
      return newContent;
    });
  };
  const updatePageContent = (e) => {
    const value = e.target.value;
    setGameContent((prev) => {
      const newContent = [...prev];
      newContent[currentIndex].value = value;
      return newContent;
    });
  };
  const updatePageTitle = (e) => {
    const value = e.target.value;
    setGameContent((prev) => {
      const newContent = [...prev];
      newContent[currentIndex].title = value;
      return newContent;
    });
  };

  return (
    <>
      <div className="row">
        <div className="col col-lg-6">
          <h3>Page Content</h3>
        </div>
        <div className="col col-lg-6">
          <h3>Page Preview</h3>
        </div>
      </div>
      <div className="row" style={rowStyle}>
        <div className="col col-lg-6">
          <Form.Label htmlFor="contentTitle">Title</Form.Label>
          <Form.Control
            aria-describedby="contentTitle"
            id="contentTitle"
            onChange={updatePageTitle}
            type="text"
            value={currentPage?.title || ""}
          />
          <Form.Text id="contentTitleHelpBlock" muted>
            Title text for the current page.
          </Form.Text>
        </div>
        <div className="col col-lg-6">
          <h2>{currentPage?.title || ""}</h2>
        </div>
      </div>

      <div className="row" style={rowStyle}>
        <div className="col col-lg-6">
          <Form.Label htmlFor="pageContentValue">Description</Form.Label>
          <Form.Control
            aria-describedby="pageContentValue"
            as="textarea"
            id="pageContentValue"
            onChange={updatePageContent}
            rows={9}
            value={currentPage?.value || ""}
          />
          <Form.Text id="pageContentValueHelpBlock" muted>
            This mark-down will appear as the content of your current page.
            <a href="https://www.markdownguide.org/cheat-sheet/">
              MarkDown Cheat Sheet
            </a>
          </Form.Text>

          <br />
        </div>
        <div className="col col-lg-6">
          <ReactMarkdown>{currentPage?.value || ""}</ReactMarkdown>
        </div>
      </div>
      <div className="row">
        <div className="col col-lg-6">
          <ButtonGroup>
            <Button variant="info" onClick={addPage} size="sm">
              &#43; Add Page
            </Button>{" "}
            <Button
              disabled={gameContent.length === 1}
              onClick={removePage}
              size="sm"
              variant="danger"
            >
              &#45; Remove Curernt Page
            </Button>
          </ButtonGroup>
          &nbsp;
          <Dropdown style={{ display: "contents" }}>
            <Dropdown.Toggle
              id="dropdown-basic"
              size="sm"
              variant="outline-primary"
            >
              Current Page: {currentPage?.title || ""}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {gameContent.map((current, index) => {
                const title = current?.title || "";
                const header = title.replace(" ", "");
                return (
                  <Dropdown.Item
                    key={`${header}-${index}`}
                    onClick={() => setCurrentIndex(index)}
                    value={index}
                  >
                    {title}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </>
  );
};
