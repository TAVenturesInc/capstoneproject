import { Form } from "react-bootstrap";

import { genreList } from "../../../genres";

import { rowStyle } from "../styles";
import { useStyleContext } from "../../../context/styleContext";

export const GameDetails = ({ gameData, onChange: setGameData }) => {
  const theme = useStyleContext();
  return(
  <>
    <div className="row">
      <div className="col col-lg-12">
        <h3 id={theme.theme} className="font_64" style={{ textAlign: "center" }}>Design Your Game</h3>
      </div>
    </div>
    <div className="row" style={rowStyle}>
      <div className="col col-lg-6">
        <Form.Label id={theme.theme} className="font2" htmlFor="title">Title</Form.Label>
        <Form.Control
          aria-describedby="title"
          id="title"
          type="text"
          value={gameData.title}
          onChange={(e) => setGameData({ ...gameData, title: e.target.value })}
        />
        <Form.Text id="titleHelpBlock" muted>
          This is your game's title that will appear in the game list.
        </Form.Text>
      </div>
    </div>
    <div className="row" style={rowStyle}>
      <div className="col col-lg-6">
        <Form.Label id={theme.theme} className="font2" htmlFor="description">Description</Form.Label>
        <Form.Control
          aria-describedby="description"
          as="textarea"
          id="description"
          rows={3}
          value={gameData.description}
          onChange={(e) =>
            setGameData({ ...gameData, description: e.target.value })
          }
        />
        <Form.Text id="descriptionHelpBlock" muted>
          This is your game's description that will appear in the game list.
        </Form.Text>
      </div>
    </div>
    <div className="row">
      <div className="col col-lg-6">
        <label id={theme.theme} className="font2" htmlFor="genre">Genre</label>
      </div>
    </div>
    <div className="row" style={rowStyle}>
      <div className="col col-lg-6">
        <select
          id="genre"
          onChange={(e) => setGameData({ ...gameData, genre: e.target.value })}
          value={gameData.genre}
        >
          {genreList.map((genre) => (
            <option key={genre.replace(" ", "")} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
    </div>
  </>
)};
