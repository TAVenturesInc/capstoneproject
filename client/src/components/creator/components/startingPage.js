import { Form } from "react-bootstrap";

import { rowStyle } from "../styles";
import { useStyleContext } from "../../../context/styleContext";

export const StartingPage = ({
  setStartingPage,
  gameContent,
  startingPage,
}) => {
  const theme = useStyleContext();
  return(
  <div className="row" style={rowStyle}>
    <div className="col col-lg-6">
      <Form.Label id={theme.theme} className="font2" htmlFor="startingPage">Starting Point</Form.Label>
      <br />
      <select
        id="startingPage"
        onChange={(e) => setStartingPage(e.target.value)}
        value={startingPage}
      >
        <option value="">First Page</option>
        {gameContent.map((page) => (
          <option key={`${page.id}`} value={page.id}>
            {page.title}
          </option>
        ))}
      </select>
      <br />
      <Form.Text id="startingPageHelpBlock" muted>
        Select the page the game will start on.
      </Form.Text>
    </div>
  </div>
)};
