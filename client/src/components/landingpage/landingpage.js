import Card from "react-bootstrap/Card";

export default function LandingPage() {
  return (
    <Card>
      <Card.Img />
      <Card.Body>
        <h1 className="font_64">TAVenture</h1>
        <Card.Title className="font_64">
          A Text Adventure for Students and Teachers
        </Card.Title>

        <Card.Text>
          <br></br>
          <br></br>
          Welcome Adventurers, to TAVenture for educators and students! Enrich
          the learning experience with customized games for any topic or
          learning environment. All you need is an internet connection.
          <br></br>
          <br></br>
          Educators: Designed with you in mind, with TAVenture you will create
          engaging and immersive learning experiences. Our intuitive platform
          lets you easily create, edit, and share interactive games tailored to
          your curriculum.
          <br></br>
          <br></br>
          Students: Sick of "whiteboard Jeopardy"? Prepare for a truly immersive
          experience. Whether you're exploring ancient civilizations, dissecting
          literary classics, or mastering mathematical concepts, TAVenture
          allows you to absorb these concepts at your own pace, and while having
          fun.
          <br></br>
          <br></br>
          Join the adventure!
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
