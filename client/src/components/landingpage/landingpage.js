import Card from "react-bootstrap/Card";

export default function LandingPage() {
  return (
    <Card style={{ margin: "2rem 4rem" }}>
      <Card.Img />
      <Card.Body>
        <Card.Title>Text Adventure Landing Page</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
