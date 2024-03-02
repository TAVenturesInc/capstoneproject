import ReactMarkdown from "react-markdown";
import generateUniqueId from "generate-unique-id";
import {
  Button,
  ButtonGroup,
  Dropdown,
  Form,
  ToggleButton,
} from "react-bootstrap";

import { rowStyle } from "../styles";
import { useStyleContext } from "../../../context/styleContext";

export const Page = ({
  currentIndex,
  currentPage,
  gameContent,
  setCurrentIndex,
  setGameContent,
}) => {
  const theme = useStyleContext();
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

  const updateGameContent = (e) => {
    const { name, value } = e.target;
    setGameContent((prev) => {
      const newContent = [...prev];
      newContent[currentIndex][name] = value;
      return newContent;
    });
  };
  const updatePageEndNode = (e) => {
    const value = e.target.value === "true";
    setGameContent((prev) => {
      const newContent = [...prev];
      newContent[currentIndex].endNode = !value;
      newContent[currentIndex].endState = "";
      return newContent;
    });
  };

  const {
    endNode = false,
    endState = "",
    title = "",
    value = "",
  } = currentPage || {};

  return (
    <>
      <div className="row">
        <div className="col col-lg-6">
          <h3 id={theme.theme} className="font2">Page Content</h3>
        </div>
        <div className="col col-lg-6">
          <h3 id={theme.theme} className="font2">Page Preview</h3>
        </div>
      </div>
      <div className="row" style={rowStyle}>
        <div className="col col-lg-6">
          <Form.Label  id={theme.theme} className="font2" htmlFor="contentTitle">Title</Form.Label>
          <Form.Control
            aria-describedby="contentTitle"
            id="contentTitle"
            name="title"
            onChange={updateGameContent}
            type="text"
            value={title}
          />
          <Form.Text id="contentTitleHelpBlock" muted>
            Title text for the current page.
          </Form.Text>
        </div>
        <div className="col col-lg-6">
          <h2 id={theme.theme} className="font2">{title}</h2>
        </div>
      </div>

      <div className="row" style={rowStyle}>
        <div className="col col-lg-6">
          <Form.Label  id={theme.theme} className="font2" htmlFor="pageContentValue">Page Content</Form.Label>
          <Form.Control
            aria-describedby="pageContentValue"
            as="textarea"
            id="pageContentValue"
            onChange={updateGameContent}
            name="value"
            rows={9}
            value={value}
          />
          <Form.Text id="pageContentValueHelpBlock" muted>
            This mark-down will appear as the content of your current page.
            <a href="https://commonmark.org/help/">MarkDown Cheat Sheet</a>
          </Form.Text>

          <br />
        </div>
        <div  id={theme.theme} className="font2 col col-lg-6">
          <ReactMarkdown >{value}</ReactMarkdown>
        </div>
      </div>
      <div className="row" style={rowStyle}>
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
              Current Page: {title}
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
      <div className="row">
        <div className="col col-lg-6">
          <ToggleButton
            checked={endNode}
            id="toggle-check"
            name="endNode"
            onChange={updatePageEndNode}
            size="sm"
            type="checkbox"
            value={endNode}
            variant="outline-primary"
          >
            Is this an end node?
          </ToggleButton>
        </div>
      </div>
      {endNode && (
        <div className="row" style={{ paddingTop: "8px" }}>
          <div className="col col-lg-6">
            <Form.Control
              aria-describedby="endState"
              id="endState"
              onChange={updateGameContent}
              type="text"
              name="endState"
              value={endState}
            />
            <Form.Text id="endStateHelpBlock" muted>
              What should be recorded for completing the game?
            </Form.Text>
          </div>
        </div>
      )}
    </>
  );
};
